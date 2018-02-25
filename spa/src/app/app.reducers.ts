import { ActionReducerMap } from '@ngrx/store';

import { reducer as BuildAggregationPipelineReducer } from './build/aggregation-pipeline.store-reducer';
import { BuildAggregationPipelineState } from './build/aggregation-pipeline.store-state';
import { reducer as BuildTimeseriesReducer } from './build/timeseries.store-reducer';
import { BuildTimeseriesState } from './build/timeseries.store-state';

export interface AppState {
  buildTimeseries: BuildTimeseriesState;
  buildAggregationPipeline: BuildAggregationPipelineState;
}

export const appReducers: ActionReducerMap<AppState> = {
  buildTimeseries: BuildTimeseriesReducer,
  buildAggregationPipeline: BuildAggregationPipelineReducer,
};
