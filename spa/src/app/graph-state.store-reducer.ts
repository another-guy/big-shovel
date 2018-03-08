import { GraphState, initialState } from './graph-state.store-state';
import { errorResponseToString } from './shared/error-response';
import { toStringRepresentation } from './shared/models/log-db-query';
import * as global from './shared/store-actions';

export function reducer(currentState: GraphState = initialState, action: global.Actions): GraphState {
  switch (action.type) {
    case global.GRAPH_DATA_LOADED: return action.errorResponse ?
      handleFailedGraphDataLoaded(currentState, action) :
      handleSuccessfulGraphDataLoaded(currentState, action);
    case global.REMOVE_GRAPH: return handleRemoveGraph(currentState, action);
    default: return currentState;
  }
}

export function handleFailedGraphDataLoaded(currentState: GraphState, action: global.GraphDataLoaded): GraphState {
  const logDbQueryAsString = toStringRepresentation(action.logDbQuery);

  const logs = { ...currentState.logs };
  const existingLogEntryData = logs[logDbQueryAsString];
  logs[logDbQueryAsString] = {
    error: errorResponseToString(action.errorResponse),
    logEntryList: (existingLogEntryData && existingLogEntryData.logEntryList) || [],
  };

  return { logs };
}

export function handleSuccessfulGraphDataLoaded(currentState: GraphState, action: global.GraphDataLoaded): GraphState {
  const logDbQueryAsString = toStringRepresentation(action.logDbQuery);

  const logs = { ...currentState.logs };
  logs[logDbQueryAsString] = { error: null, logEntryList: action.data };

  return { logs };
}

export function handleRemoveGraph(currentState: GraphState, action: global.RemoveGraph): GraphState {
  const logDbQueryAsString = action.graphId;

  const logs = { ...currentState.logs };
  delete logs[logDbQueryAsString];

  return { logs };
}
