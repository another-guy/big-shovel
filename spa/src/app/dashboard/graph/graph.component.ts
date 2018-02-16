import { ChangeDetectionStrategy, Component, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';
import { Observable } from 'rxjs/Observable';

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
  
  @Input() svgSize = { w: 600, h: 100, };

  @Input() logDbQueryRepresentation: string;
  logEntries$: Store<LogEntry[]>;
  totalLogEntryCount$: Observable<number>;

  constructor(
    private _store: Store<AppState>,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this.logEntries$ = _store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
    this.totalLogEntryCount$ = this.logEntries$.map(logEntries => logEntries.length);
  }

  ngOnInit(): void {
    this.logEntries$.subscribe(logEntries => this.plot(logEntries));
  }

  removeTrackedExpression(): void {
    // TODO ...
  }

  private plot(logEntries: LogEntry[]): void {

    const rootElement = this._viewContainerRef.element.nativeElement;
    
    const barPadding = 3;
    const base = 15;

    const svgWidth = this.svgSize.w;
    const svgHeight = this.svgSize.h;

    const dateAndHourlyGrouped = this.groupByHours(logEntries);
    const dateAndHourGroupCounts = d3.keys(dateAndHourlyGrouped).map(prop => dateAndHourlyGrouped[prop].length);

    const yScale = d3.scaleLinear()
      .domain([ 0, d3.max(dateAndHourGroupCounts) ])
      .range([ 0, svgHeight - base * 2 ]);
    const yScaleReverse = d3.scaleLinear()
      .domain(yScale.domain())
      .range(yScale.range().reverse());

    const dateAndHourlyLogEntryCounts = d3.keys(dateAndHourlyGrouped)
      .map(dateAndHour => {
        const logEntriesForDateAndHour = dateAndHourlyGrouped[dateAndHour] || [];
        return {
          errors: logEntriesForDateAndHour.filter(logEntry => logEntry.level === 'ERROR').length,
          infos: logEntriesForDateAndHour.filter(logEntry => logEntry.level === 'INFO').length,
        }
      });

    const sumAll = (count: { errors: number, infos: number }) => count.errors + count.infos;

    const svg = d3.select(rootElement)
      .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    svg.selectAll('rect.error-segment')
      .data(dateAndHourlyLogEntryCounts)
      .enter()
      .append('rect')
        .attr('class', 'error-segment')
        .attr('fill', count => `#ccc`)
        .attr('x', (_, index) => index * (svgWidth / dateAndHourlyLogEntryCounts.length - barPadding))
        .attr('y', (count, _) => svgHeight - yScale(sumAll(count)) - base)
        .attr('width', 20)
        .attr('height', count => yScale(sumAll(count)));
    
    svg.selectAll('text.errorBar')
      .data(dateAndHourlyLogEntryCounts)
      .enter()
      .append('text')
        .attr('class', 'errorBar')
        .attr('fill', 'red')
        .attr('x', (_, index) => 1.5 + index * (svgWidth / dateAndHourlyLogEntryCounts.length - barPadding))
        .attr('y', count => svgHeight - yScale(sumAll(count)) - 2 - base)
        .text(count => +sumAll(count) || '');

    const keys = d3.keys(dateAndHourlyGrouped);
    svg.selectAll('text.subs')
      .data(keys)
        .enter()
      .append('text')
          .attr('class', 'subs')
        .attr('fill', 'black')
        .attr('x', (_, index) => 1.5 + index * (svgWidth / dateAndHourlyLogEntryCounts.length - barPadding))
          .attr('y', count => svgHeight)
        .text((_, index) => keys[index]);


    const yAxis = d3.axisRight(yScaleReverse).ticks(5);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${ svgWidth - 25 }, ${ base })`)
      .call(yAxis);
  }

  private groupByHours(logEntries: LogEntry[]): { [_: string]: LogEntry[] } {
    const getPeriodKey = (logEntry: LogEntry): string => logEntry.time.split(':')[0];

    return logEntries.reduce(
        (subresult, logEntry) => {
          const periodKey = getPeriodKey(logEntry);
          const periodLogEntries = subresult[periodKey];
          if (periodLogEntries) {
            periodLogEntries.push(logEntry);
          } else {
            subresult[periodKey] = [ logEntry ];
          };
          return subresult;
        },
        <{ [_: string]: LogEntry[] }>{}
      );
  }
}
