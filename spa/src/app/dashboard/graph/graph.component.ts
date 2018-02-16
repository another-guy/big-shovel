import { ChangeDetectionStrategy, Component, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent {

  trackByLogEntry(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }
  
  @Input() logDbQueryRepresentation: string;
  logEntries$: Store<LogEntry[]>;

  constructor(
    private _store: Store<AppState>,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this.logEntries$ = _store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
  }

  ngOnInit(): void {
    this.logEntries$.subscribe(logEntries => this.plot(logEntries));
  }

  removeTrackedExpression(): void {
    // TODO ...
  }

  private plot(logEntries: LogEntry[]): void {
    const svgWidth = 600;
    const svgHeight = 100;

    const hourlyGrouped = this.groupByHours(logEntries);
    const byHourEntryCounts = d3.keys(hourlyGrouped).map(prop => hourlyGrouped[prop].length);

    const yScale = d3.scaleLinear()
      .domain([ 0, d3.max(byHourEntryCounts) ])
      .range([ 0, svgHeight ]);
    const yScaleReverse = d3.scaleLinear()
      .domain(yScale.domain())
      .range(yScale.range().reverse())

    const hourlyLogEntryCounts = [
      '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
      '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
    ].map(hour => {
      const logEntriesForHour = hourlyGrouped[hour] || [];
      return {
        errors: logEntriesForHour.filter(logEntry => logEntry.level === 'ERROR').length,
        infos: logEntriesForHour.filter(logEntry => logEntry.level === 'INFO').length,
      }
    });

    const rootElement = this._viewContainerRef.element.nativeElement;
    
    const barPadding = 3;
    const base = 15;

    const svg = d3.select(rootElement)
      .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    svg.selectAll('rect.error-segment')
      .data(hourlyLogEntryCounts)
      .enter()
      .append('rect')
        .attr('class', 'error-segment')
        .attr('fill', count => `rgb(${ 256 - count.errors * 2 }, 0, 0)`)
        .attr('x', (_, index) => index * (svgWidth / hourlyLogEntryCounts.length - barPadding))
        .attr('y', (count, _) => svgHeight - yScale(count.errors) - base)
        .attr('width', 20)
        .attr('height', count => yScale(count.errors));
    
    svg.selectAll('text.errorBar')
      .data(hourlyLogEntryCounts)
      .enter()
      .append('text')
        .attr('class', 'errorBar')
        .attr('fill', 'red')
        .attr('x', (_, index) => 1.5 + index * (svgWidth / hourlyLogEntryCounts.length - barPadding))
        .attr('y', count => svgHeight - yScale(count.errors) - 2 - base)
        .text(count => +count.errors || '');

    svg.selectAll('text.subs')
      .data(hourlyLogEntryCounts)
      .enter()
      .append('text')
        .attr('class', 'subs')
        .attr('fill', 'black')
        .attr('x', (_, index) => 1.5 + index * (svgWidth / hourlyLogEntryCounts.length - barPadding))
        .attr('y', count => svgHeight)
        .text((_, index) => ('0' + index).slice(-2));

    const yAxis = d3.axisRight(yScaleReverse).ticks(5);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${ svgWidth - 25 }, ${ -base })`)
      .call(yAxis);
  }

  private groupByHours(logEntries: LogEntry[]): { [_: string]: LogEntry[] } {
    const getHourKey = (logEntry: LogEntry): string => logEntry.time.split(' ')[1].split(':')[0];

    return logEntries.reduce(
        (subresult, logEntry) => {
          const hour = getHourKey(logEntry);
          const hourData = subresult[hour];
          if (hourData) {
            hourData.push(logEntry);
          } else {
            subresult[hour] = [ logEntry ];
          };
          return subresult;
        },
        <{ [_: string]: LogEntry[] }>{}
      );
  }
}
