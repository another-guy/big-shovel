import * as global from '../shared/store-actions';
import { BuildAggregationPipelineState, initialState } from './aggregation-pipeline.store-state';

export function reducer(currentState: BuildAggregationPipelineState = initialState, action: global.Actions): BuildAggregationPipelineState {
  return currentState;
}
