import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.store-state';
import { reducer as BuildAggregationPipelineReducer } from './build/aggregation-pipeline.store-reducer';
import { reducer as BuildTimeseriesReducer } from './build/timeseries.store-reducer';
import { reducer as GraphStateReducer } from './graph.store-reducer';

export const appReducers: ActionReducerMap<AppState> = {
  graph: GraphStateReducer,
  buildTimeseries: BuildTimeseriesReducer,
  buildAggregationPipeline: BuildAggregationPipelineReducer,
};
