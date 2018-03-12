import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.store-state';
import { AllOptions } from './graph.store-state';
import {
  GraphOptionsEnquirerComponent,
} from './shared/components/graph-options-enquirer-component/graph-options-enquirer.component';
import { LogEntry } from './shared/models/log-entry';
import { minuteMetric } from './shared/models/metric-type';
import {
  ADD_GRAPH,
  AddGraph,
  ENQUIRE_GRAPH_OPTIONS,
  EnquireGraphOptions,
  GRAPH_DATA_LOADED,
  GraphDataLoaded,
  RedrawGraph,
  UPDATE_GRAPH_OPTIONS,
  UpdateGraphOptions,
} from './shared/store-actions';

const host = `http://localhost:3003`; // TODO Move to configuration

@Injectable()
export class Effects {

  private allGraphOptions$: Observable<AllOptions> = this._store.select(state => state.graph.options);

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(action =>
      this._http
        .get(`${host}/logs/aggregate?p=${action.query}`)
        .map(logEntries => new GraphDataLoaded(action.graphId, <LogEntry[]>logEntries, null))
        .catch(errorResponse => Observable.of(new GraphDataLoaded(action.graphId, null, errorResponse)))
    );

  @Effect() graphDataLoaded$ = this._actions
    .ofType<GraphDataLoaded>(GRAPH_DATA_LOADED)
    .delay(300)
    .withLatestFrom(this.allGraphOptions$, (action, allGraphOptions) => ({ action, options: allGraphOptions[action.graphId] }))
    .map(({ action, options }) => {
      console.warn(new Date(), action, options);

      return !action.errorResponse && options ?
        new RedrawGraph(action.graphId) :
        new EnquireGraphOptions(action.graphId, action.data);
    });

  @Effect() enquireGraphOptions$ = this._actions
    .ofType<EnquireGraphOptions>(ENQUIRE_GRAPH_OPTIONS)
    .concatMap(action => {
      return this._matDialog
        .open(GraphOptionsEnquirerComponent, { data: action.data })
        .afterClosed()
        .map(selectedGraphOptions => {
          console.warn(new Date(), `options selected`, selectedGraphOptions);
          return new UpdateGraphOptions(action.graphId, { chartType: 'line', metricType: minuteMetric }, true);
        });
    });

  @Effect() xxx$ = this._actions
    .ofType<UpdateGraphOptions>(UPDATE_GRAPH_OPTIONS)
    .filter(action => action.forceRedraw)
    .map(action => new RedrawGraph(action.graphId));

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
    private _store: Store<AppState>,
    private _matDialog: MatDialog,
  ) { }
}
