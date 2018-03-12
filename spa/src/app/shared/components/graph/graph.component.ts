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
import { MatDialog } from '@angular/material';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as c3 from 'c3';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../app.store-state';
import { Data, GraphC3ConfigHelper, XAxis } from '../../../shared/c3/config-helper';
import { GraphOptions } from '../../../shared/models/graph-options';
import { LogEntry } from '../../../shared/models/log-entry';
import { ENQUIRE_GRAPH_OPTIONS, EnquireGraphOptions, REDRAW_GRAPH, RedrawGraph, RemoveGraph } from '../../store-actions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit, OnDestroy {

  @Input() svgSize = { width: 600, height: 100, };

  @Input() graphId: string;

  collapsed: boolean = false;

  graphOptions$: Observable<GraphOptions>;
  logEntries$: Observable<LogEntry[]>;
  totalLogEntryCount$: Observable<number>;
  error$: Observable<string>;

  graphRedrawRequests$ = this._actions
    .ofType<RedrawGraph>(REDRAW_GRAPH)
    .filter(action => action.graphId === this.graphId);

  enquireGraphOptions$ = this._actions
    .ofType<EnquireGraphOptions>(ENQUIRE_GRAPH_OPTIONS)
    .subscribe(action => {
      this._matDialog
        .open(GraphOptionsEnquirerComponent<LogEntry[]>, action.data)
        .afterClosed()
        .subscribe(x => {
          // TODO Dispatch "GraphOptionsCollected"
        });
    });

  private _plotSubscription: Subscription;
  constructor(
    private _store: Store<AppState>,
    private _actions: Actions,
    private _viewContainerRef: ViewContainerRef,
    private _matDialog: MatDialog,
  ) {
    this.graphOptions$ = _store.select(state => state.graph.options[this.graphId]);

    const data$ = _store.select(state => state.graph.logs[this.graphId]);
    this.logEntries$ = data$.map(loadedGraphData => loadedGraphData && loadedGraphData.logEntryList);
    this.error$ = data$.map(loadedGraphData => loadedGraphData && loadedGraphData.error);

    this.totalLogEntryCount$ = data$.map(loadedGraphData => loadedGraphData && loadedGraphData.logEntryList && loadedGraphData.logEntryList.length);
  }

  ngOnInit(): void {
    this._plotSubscription = this.graphRedrawRequests$
      .withLatestFrom(this.logEntries$, this.graphOptions$, (request, logEntries, graphOptions) => {
        if (!logEntries || !graphOptions) return;
        this.plot(
          logEntries.map(logEntry => (
            logEntry.time = logEntry.time && logEntry.time.replace(' ', 'T'),   // TODO Fix that on logging side!!!
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
    this._store.dispatch(new RemoveGraph(this.graphId));
  }

  private plot(logEntries: LogEntry[], graphOptions: GraphOptions): void {
    const looksLikeTimeseries = logEntries[0].time != null; // TODO!!!

    const { xAxis, data } = looksLikeTimeseries ?
      this.timeSeriesXAxisAndData(logEntries, graphOptions) :
      this.nonTimeSeriesXAxisAndData(logEntries, graphOptions);

    c3.generate({
      ...(new GraphC3ConfigHelper()).createConfig(graphOptions.chartType, xAxis, data),
      bindto: this._viewContainerRef.element.nativeElement.querySelector('div.svg-container'),
      size: this.svgSize,
    });
  }

  private nonTimeSeriesXAxisAndData(logEntries: LogEntry[], graphOptions: GraphOptions): { xAxis: XAxis, data: Data } {
    return {
      xAxis: {
        xTickList: logEntries.map(x => x._id),
        metric: {
          name: null,
          xFormat: null,
          xTickFormat: null,
          getKey: null,
        },
        isTimeseries: false,
      },
      data: {
        'ERRORS': { pointList: logEntries.map(x => ((<any>x).count || 0)), color: 'red' },
      }
    };
  }

  private timeSeriesXAxisAndData(logEntries: LogEntry[], graphOptions: GraphOptions) {
    const groupedByPeriod = this.groupByPeriod(logEntries, graphOptions.metricType.getKey);
    const periodKeyList = Object.getOwnPropertyNames(groupedByPeriod);
    const errors = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'ERROR').length);
    const infos = periodKeyList.map(periodKey => groupedByPeriod[periodKey].filter(logEntry => logEntry.level === 'INFO').length);

    return {
      xAxis: {
        xTickList: periodKeyList,
        metric: graphOptions.metricType,
        isTimeseries: true,
      },
      data: {
        'INFOS': { pointList: infos, color: 'gray' },
        'ERRORS': { pointList: errors, color: 'red' },
      }
    };
  }

  // TODO Unit test
  // TODO Add filler for missing periods (with empty values)
  private groupByPeriod(
    logEntries: LogEntry[],
    getPeriodKey: (timestamp: string) => string,
  ): { [_: string]: LogEntry[] } {
    return logEntries
      .filter(logEntry => logEntry.time != null)
      .reduce(
        (subresult, logEntry) => {
          const periodKey = getPeriodKey(logEntry.time); // TODO   GPR_FEAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
