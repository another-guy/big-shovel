import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ADD_GRAPH, AddGraph, GraphDataLoaded } from './actions';
import { toStringRepresentation } from './models/log-db-query';
import { LogEntry } from './models/log-entry';

@Injectable()
export class Effects {

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(addGraph =>
        this._http
            .get(`http://localhost:3003/mongo?${toStringRepresentation(addGraph.logDbQuery)}`)
            .map(logEntries => (new GraphDataLoaded(addGraph.logDbQuery, <LogEntry[]>logEntries)))
    );

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) {}
}
