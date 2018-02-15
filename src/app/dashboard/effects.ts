import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { AddGraph, GraphDataLoaded, ADD_GRAPH } from './actions';

@Injectable()
export class Effects {

  @Effect() addGraph$ = this._actions
    .ofType<AddGraph>(ADD_GRAPH)
    .concatMap(addGraph =>
        this._http
            .get(`http://localhost:3001/logs?id=${addGraph.expression}`)
            .map(response => (new GraphDataLoaded(addGraph.expression, response)))
    );

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) {}
}
