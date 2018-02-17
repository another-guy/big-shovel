import { ChangeDetectionStrategy, Component, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as c3 from 'c3';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';
import { AggregationKey } from '../models/log-entry-key-extractors';
import { GraphC3ConfigHelper } from './graph-c3-config-helper';

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
  
  @Input() kind: string = 'line';
  @Input() svgSize = { width: 600, height: 100, };

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
    this.logEntries$.subscribe(logEntries =>
      this.plot(logEntries.map(logEntry => (
        logEntry.time = logEntry.time.replace(' ', 'T'),   // TODO Fix that on logging side!!!
        logEntry
      )))
    );
  }

  removeTrackedExpression(): void {
    // TODO ...
  }

  private plot(logEntries: LogEntry[]): void {
    const metric = AggregationKey.minuteMetric;

    const groupedByPeriod = this.groupByPeriod(logEntries, metric.getKey);
    const periodKeyList = Object.getOwnPropertyNames(groupedByPeriod);
    const errors = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'ERROR').length);
    const infos = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'INFO').length);
    const totals = periodKeyList.map(periodKey => groupedByPeriod[periodKey].length);

    const c3ConfigBase = new GraphC3ConfigHelper().getBaseConfigForTimeSeries(this.kind, metric, periodKeyList, errors, infos);

    const _ = c3.generate({
      ...c3ConfigBase,
      bindto: this._viewContainerRef.element.nativeElement.querySelector('div.svg-container'),
      size: this.svgSize,
      zoom: { enabled: true },
      subchart: { show: true },
    });
  }

  // TODO Unit test
  // TODO Add filler for missing periods (with empty values)
  private groupByPeriod(
    logEntries: LogEntry[],
    getPeriodKey: (timestamp: string) => string,
  ): { [_: string]: LogEntry[] } {
    return logEntries.reduce(
        (subresult, logEntry) => {
          const periodKey = getPeriodKey(logEntry.time);
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
