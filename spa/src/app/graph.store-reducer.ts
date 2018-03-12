import { GraphState, initialState } from './graph.store-state';
import { errorResponseToString } from './shared/error-response';
import * as global from './shared/store-actions';
import { hourlyMetric } from './shared/models/metric-type';
import { GraphOptions } from './shared/models/graph-options';

export function reducer(currentState: GraphState = initialState, action: global.Actions): GraphState {
  switch (action.type) {
    case global.GRAPH_DATA_LOADED: return action.errorResponse ?
      handleFailedGraphDataLoaded(currentState, action) :
      handleSuccessfulGraphDataLoaded(currentState, action);
    case global.UPDATE_GRAPH_OPTIONS: return handleUpdateGraphOptions(currentState, action);
    case global.REMOVE_GRAPH: return handleRemoveGraph(currentState, action);
    default: return currentState;
  }
}

export function handleFailedGraphDataLoaded(currentState: GraphState, action: global.GraphDataLoaded): GraphState {
  const logs = { ...currentState.logs };
  const existingLogEntryData = logs[action.graphId];
  logs[action.graphId] = {
    error: errorResponseToString(action.errorResponse),
    logEntryList: (existingLogEntryData && existingLogEntryData.logEntryList) || [],
  };

  // const options = { ...currentState.options };
  // options[action.graphId] = { chartType: 'line', metricType: hourlyMetric };

  return { logs, options: currentState.options };
}

export function handleSuccessfulGraphDataLoaded(currentState: GraphState, action: global.GraphDataLoaded): GraphState {
  const logs = { ...currentState.logs };
  logs[action.graphId] = { error: null, logEntryList: action.data };

  // const options = { ...currentState.options };
  // options[action.graphId] = { chartType: 'line', metricType: hourlyMetric };

  return { logs, options: currentState.options };
}

export function handleUpdateGraphOptions(currentState: GraphState, action: global.UpdateGraphOptions): GraphState {
  const options = { ...currentState.options };

  const optionsBeforeEvent = options[action.graphId] || ({} as GraphOptions);
  const newOptions = { ...optionsBeforeEvent };
  Object
    .getOwnPropertyNames(action.options)
    .forEach(key => {
      const proposedValue = action.options[key];
      if (proposedValue !== undefined) newOptions[key] = proposedValue;
    });

  options[action.graphId] = newOptions;

  return { logs: currentState.logs, options };
}

export function handleRemoveGraph(currentState: GraphState, action: global.RemoveGraph): GraphState {
  const logDbQueryAsString = action.graphId;

  const logs = { ...currentState.logs };
  delete logs[logDbQueryAsString];

  const options = { ...currentState.options };
  delete options[logDbQueryAsString];

  return { logs, options };
}
