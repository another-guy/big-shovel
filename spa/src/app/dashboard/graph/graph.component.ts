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
    const svgHeight = 300;

    const hourlyGrouped = this.groupByHours(logEntries);
    const byHourEntryCounts = d3.keys(hourlyGrouped).map(prop => hourlyGrouped[prop].length);
    const minTotal = d3.min(byHourEntryCounts);
    const maxTotal = d3.max(byHourEntryCounts);
    const yScale = d3.scaleLinear()
      .domain([ minTotal, maxTotal ])
      .range([ 0, svgHeight ]);
    
    
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
    const svg = d3.select(rootElement)
      .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    svg.selectAll('rect')
      .data(hourlyLogEntryCounts)
      .enter()
      .append('rect')
        .attr('fill', count => `rgb(${ 256 - count.errors * 2 }, 0, 0)`)
        .attr('x', (_, index) => index * (svgWidth / hourlyLogEntryCounts.length - barPadding))
        .attr('y', (count, _) => svgHeight - count.errors * 6)
        .attr('width', 20)
        .attr('height', count => count.errors * 6);
    
    svg.selectAll('text')
      .data(hourlyLogEntryCounts)
      .enter()
      .append('text')
        .attr('fill', 'white')
        .attr('x', (_, index) => 1.5 + index * (svgWidth / hourlyLogEntryCounts.length - barPadding))
        .attr('y', count => 14 + svgHeight - (count.errors * 6))
        .text(count => +count.errors);

    // const hoursSelection = d3
    //   .select(rootElement)
    //   .select('div')
    //     .style('background-color', '#eee')
    //   .selectAll('div')
    //   .data(hourlyLogEntryCount)
    //     .enter();
      
    // hoursSelection.append('div')
    //   .attr('class', 'error-segment')
    //   .style('height', count => `${(count.errors) * 2}px`)
    //   .attr('title', count => `TOTAL: ${count.errors + count.infos} (ERROR: ${count.errors}, INFO: ${count.infos})`);
    // hoursSelection.append('div')
    //   .attr('class', 'info-segment')
    //   .style('height', count => `${(count.infos) * 2}px`)
    //   .attr('title', count => `TOTAL: ${count.errors + count.infos} (ERROR: ${count.errors}, INFO: ${count.infos})`);
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
