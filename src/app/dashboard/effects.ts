import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ADD_GRAPH, AddGraph, GraphDataLoaded } from './actions';

@Injectable()
export class Effects {

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(addGraph =>
        this._http
            .get(`http://localhost:3001/logs?id=${addGraph.expression}`)
            .map(logEntries => (new GraphDataLoaded(addGraph.expression, logEntries)))
    );

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) {}
}
