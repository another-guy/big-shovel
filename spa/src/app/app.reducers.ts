import { ActionReducerMap } from '@ngrx/store';

import { reducer as BuildAggregationPipelineReducer } from './build/aggregation-pipeline.store-reducer';
import { BuildAggregationPipelineState } from './build/aggregation-pipeline.store-state';
import { reducer as BuildTimeseriesReducer } from './build/timeseries.store-reducer';
import { BuildTimeseriesState } from './build/timeseries.store-state';
import { reducer as GraphStateReducer } from './graph-state.store-reducer';
import { GraphState } from './graph-state.store-state';

export interface AppState {
  graph: GraphState;
  buildTimeseries: BuildTimeseriesState;
  buildAggregationPipeline: BuildAggregationPipelineState;
}

export const appReducers: ActionReducerMap<AppState> = {
  graph: GraphStateReducer,
  buildTimeseries: BuildTimeseriesReducer,
  buildAggregationPipeline: BuildAggregationPipelineReducer,
};
