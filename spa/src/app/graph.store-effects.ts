import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.store-state';
import { AllOptions } from './graph.store-state';
import { LogEntry } from './shared/models/log-entry';
import { ADD_GRAPH, AddGraph, GRAPH_DATA_LOADED, GraphDataLoaded, RedrawGraph, EnquireGraphOptions } from './shared/store-actions';

const host = `http://localhost:3003`; // TODO Move to configuration

@Injectable()
export class Effects {

  private allGraphOptions$: Observable<AllOptions>;

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
    .withLatestFrom(this.allGraphOptions$, (action, allGraphOptions) => ({ action, allGraphOptions }))
    .map(({ action, allGraphOptions }) => {
      const options = allGraphOptions[action.graphId];
      return !action.errorResponse && options ?
        new RedrawGraph(action.graphId) :
        new EnquireGraphOptions(action.graphId, action.data);
    });

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
    private _store: Store<AppState>,
  ) {
    this.allGraphOptions$ = this._store.select(state => state.graph.options);
  }
}
