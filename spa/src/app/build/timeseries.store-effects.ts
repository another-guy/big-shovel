import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { toStringRepresentation } from '../shared/models/log-db-query';
import { LogEntry } from '../shared/models/log-entry';
import { ADD_GRAPH, AddGraph, GRAPH_DATA_LOADED, GraphDataLoaded, RedrawGraph } from '../shared/store-actions';

const host = `http://localhost:3003`; // TODO Move to configuration

@Injectable()
export class Effects {

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(action =>
      this._http
        .get(`${host}/logs/timeseries?${toStringRepresentation(action.logDbQuery)}`)
        .map(logEntries => new GraphDataLoaded(action.logDbQuery, <LogEntry[]>logEntries, null))
        .catch(errorResponse => Observable.of(new GraphDataLoaded(action.logDbQuery, null, errorResponse)))
    );

  @Effect() graphDataLoaded$ = this._actions
    .ofType<GraphDataLoaded>(GRAPH_DATA_LOADED)
    .delay(300)
    .map(action => new RedrawGraph(toStringRepresentation(action.logDbQuery)));

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) { }
}
