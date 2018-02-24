import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as c3 from 'c3';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../app.reducers';
import { GraphC3ConfigHelper } from '../../../shared/c3/config-helper';
import { GraphOptions } from '../../../shared/models/graph-options';
import { LogEntry } from '../../../shared/models/log-entry';
import { REDRAW_GRAPH, RedrawGraph, RemoveGraph } from '../../store-actions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit, OnDestroy {

  trackByLogEntry(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }
  
  @Input() svgSize = { width: 600, height: 100, };

  @Input() logDbQueryRepresentation: string;

  collapsed: boolean = false;

  graphOptions$: Observable<GraphOptions>;
  logEntries$: Observable<LogEntry[]>;
  totalLogEntryCount$: Observable<number>;
  error$: Observable<string>;

  graphRedrawRequests$ = this._actions
    .ofType<RedrawGraph>(REDRAW_GRAPH)
    .filter(action => action.logDbQueryRepresentation === this.logDbQueryRepresentation);

  private _plotSubscription: Subscription;
  constructor(
    private _store: Store<AppState>,
    private _actions: Actions,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this.graphOptions$ = _store.select(state => state.dashboard.allGraphOptions[this.logDbQueryRepresentation]);

    const data = _store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
    this.logEntries$ = data.map(loadedGraphData => loadedGraphData && loadedGraphData.logEntryList);
    this.error$ = data.map(loadedGraphData => loadedGraphData && loadedGraphData.error);

    this.totalLogEntryCount$ = data.map(loadedGraphData => loadedGraphData && loadedGraphData.logEntryList && loadedGraphData.logEntryList.length);
  }

  ngOnInit(): void {
    this._plotSubscription = this.graphRedrawRequests$
      .withLatestFrom(this.logEntries$, this.graphOptions$, (request, logEntries, graphOptions) => {
        if (!logEntries || !graphOptions) return;
        this.plot(
          logEntries.map(logEntry => (
            logEntry.time = logEntry.time.replace(' ', 'T'),   // TODO Fix that on logging side!!!
            logEntry
          )),
          graphOptions,
        );
      })
      .subscribe();
  }
  ngOnDestroy(): void {
    if (this._plotSubscription) {
      this._plotSubscription.unsubscribe();
      this._plotSubscription = null;
    }
  }

  removeTrackedExpression(): void {
    this._store.dispatch(new RemoveGraph(this.logDbQueryRepresentation));
  }

  private plot(logEntries: LogEntry[], graphOptions: GraphOptions): void {

    const groupedByPeriod = this.groupByPeriod(logEntries, graphOptions.metricType.getKey);
    const periodKeyList = Object.getOwnPropertyNames(groupedByPeriod);
    const errors = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'ERROR').length);
    const infos = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'INFO').length);

    const c3ConfigBase = new GraphC3ConfigHelper().getBaseConfigForTimeSeries(graphOptions.chartType, graphOptions.metricType, periodKeyList, errors, infos);

    c3.generate({
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
