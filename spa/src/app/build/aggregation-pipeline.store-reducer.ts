import { errorResponseToString } from '../shared/error-response';
import * as global from '../shared/store-actions';
import { BuildAggregationPipelineState, initialState } from './aggregation-pipeline.store-state';

export function reducer(currentState: BuildAggregationPipelineState = initialState, action: global.Actions): BuildAggregationPipelineState {
  switch (action.type) {
    case global.AGGREGATION_PIPELINE_GRAPH_DATA_LOADED: return action.errorResponse ?
      handleFailedAggregationPipelineGraphDataLoaded(currentState, action) :
      handleSuccessfulAggregationPipelineGraphDataLoaded(currentState, action);

    default: return currentState;
  }
}

export function handleFailedAggregationPipelineGraphDataLoaded(currentState: BuildAggregationPipelineState, action: global.AggregationPipelineGraphDataLoaded): BuildAggregationPipelineState {
  return { error: errorResponseToString(action.errorResponse), logEntryList: initialState.logEntryList };
}

export function handleSuccessfulAggregationPipelineGraphDataLoaded(currentState: BuildAggregationPipelineState, action: global.AggregationPipelineGraphDataLoaded): BuildAggregationPipelineState {
  return { error: initialState.error, logEntryList: action.logEntries };
}
