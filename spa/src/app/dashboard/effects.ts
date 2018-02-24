import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ADD_GRAPH, AddGraph, GRAPH_DATA_LOADED, GraphDataLoaded, RedrawGraph } from './actions';
import { toStringRepresentation } from './models/log-db-query';
import { LogEntry } from './models/log-entry';

@Injectable()
export class Effects {

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(addGraph =>
      this._http
        .get(`http://localhost:3003/logs/timeseries?${toStringRepresentation(addGraph.logDbQuery)}`)
        .map(logEntries => new GraphDataLoaded(addGraph.logDbQuery, <LogEntry[]>logEntries, null))
        .catch(errorResponse => Observable.of(new GraphDataLoaded(addGraph.logDbQuery, null, errorResponse)))
    );

  @Effect() graphDataLoaded$ = this._actions
    .ofType<GraphDataLoaded>(GRAPH_DATA_LOADED)
    .delay(300)
    .map(graphDataLoaded => new RedrawGraph(toStringRepresentation(graphDataLoaded.logDbQuery)));

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) {}
}
