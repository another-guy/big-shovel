import { BuildAggregationPipelineState } from './build/aggregation-pipeline.store-state';
import { BuildTimeseriesState } from './build/timeseries.store-state';
import { GraphState } from './graph.store-state';

export interface AppState {
  graph: GraphState;
  buildTimeseries: BuildTimeseriesState;
  buildAggregationPipeline: BuildAggregationPipelineState;
}
