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

import { UntypedLogEntry } from '../shared/models/untyped-log-entry';
import {
  ADD_AGGREGATION_PIPELINE_GRAPH,
  AddAggregationPipelineGraph,
  AGGREGATION_PIPELINE_GRAPH_DATA_LOADED,
  AggregationPipelineGraphDataLoaded,
  RedrawAggregationPipelineGraph,
} from '../shared/store-actions';

const host = `http://localhost:3003`; // TODO Move to configuration

@Injectable()
export class Effects {

  @Effect() addAggregationPipelineGraph$ = this._actions
    .ofType<AddAggregationPipelineGraph>(ADD_AGGREGATION_PIPELINE_GRAPH)
    .concatMap(action => 
      this._http
        .get(`${host}/logs/aggregate?p=${action.aggregationPipeline}`)
        .map(entries => 
          new AggregationPipelineGraphDataLoaded(action.aggregationPipeline, action.requesterId, <UntypedLogEntry[]>entries, null)
        )
        .catch(errorResponse => Observable.of(
          new AggregationPipelineGraphDataLoaded(action.aggregationPipeline, action.requesterId, null, errorResponse)
        ))
    );

  @Effect() aggregationPipelineGraphDataLoaded$ = this._actions
    .ofType<AggregationPipelineGraphDataLoaded>(AGGREGATION_PIPELINE_GRAPH_DATA_LOADED)
    .delay(300)
    .map(action => new RedrawAggregationPipelineGraph(action.aggregationPipeline, action.requesterId));

  constructor(
    private _http: HttpClient,
    private _actions: Actions,
  ) { }
}
