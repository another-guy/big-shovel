import * as buildTimeseries from './build/timeseries.store-effects';
import * as buildAggregationPipeline from './build/aggregation-pipeline.store-effects';

export const appEffects = [
  buildTimeseries.Effects,
  buildAggregationPipeline.Effects,
];
