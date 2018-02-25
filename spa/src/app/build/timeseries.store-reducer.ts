import { errorResponseToString } from '../shared/error-response';
import { GraphOptions } from '../shared/models/graph-options';
import { toStringRepresentation } from '../shared/models/log-db-query';
import { hourlyMetric } from '../shared/models/metric-type';
import * as global from '../shared/store-actions';
import { BuildTimeseriesState, initialState } from './timeseries.store-state';

export function reducer(currentState: BuildTimeseriesState = initialState, action: global.Actions): BuildTimeseriesState {
  switch (action.type) {
    case global.GRAPH_DATA_LOADED: return action.errorResponse ?
      handleFailedGraphDataLoaded(currentState, action) :
      handleSuccessfulGraphDataLoaded(currentState, action);
    case global.UPDATE_GRAPH_OPTIONS: return handleUpdateGraphOptions(currentState, action);
    case global.REMOVE_GRAPH: return handleRemoveGraph(currentState, action);
    default: return currentState;
  }
}

export function handleFailedGraphDataLoaded(currentState: BuildTimeseriesState, action: global.GraphDataLoaded): BuildTimeseriesState {
  const logDbQueryAsString = toStringRepresentation(action.logDbQuery);

  const allLogs = { ...currentState.allLogs };
  const existingLogEntryData = allLogs[logDbQueryAsString];
  allLogs[logDbQueryAsString] = {
    error: errorResponseToString(action.errorResponse),
    logEntryList: (existingLogEntryData && existingLogEntryData.logEntryList) || []
  };

  const allGraphOptions = { ...currentState.allGraphOptions };
  allGraphOptions[logDbQueryAsString] = { chartType: 'line', metricType: hourlyMetric };

  return { allLogs, allGraphOptions };
}

export function handleSuccessfulGraphDataLoaded(currentState: BuildTimeseriesState, action: global.GraphDataLoaded): BuildTimeseriesState {
  const logDbQueryAsString = toStringRepresentation(action.logDbQuery);

  const allLogs = { ...currentState.allLogs };
  allLogs[logDbQueryAsString] = { error: null, logEntryList: action.data };

  const allGraphOptions = { ...currentState.allGraphOptions };
  allGraphOptions[logDbQueryAsString] = { chartType: 'line', metricType: hourlyMetric };

  return { allLogs, allGraphOptions };
}

export function handleUpdateGraphOptions(currentState: BuildTimeseriesState, action: global.UpdateGraphOptions): BuildTimeseriesState {
  const allGraphOptions = { ...currentState.allGraphOptions };

  const optionsBeforeEvent = allGraphOptions[action.logDbQueryRepresentation] || ({} as GraphOptions);
  const newOptions = { ...optionsBeforeEvent };
  Object
    .getOwnPropertyNames(action.options)
    .forEach(key => {
      const proposedValue = action.options[key];
      if (proposedValue !== undefined) newOptions[key] = proposedValue;
    });

  allGraphOptions[action.logDbQueryRepresentation] = newOptions;

  return { allLogs: currentState.allLogs, allGraphOptions: allGraphOptions };
}

export function handleRemoveGraph(currentState: BuildTimeseriesState, action: global.RemoveGraph): BuildTimeseriesState {
  const logDbQueryAsString = action.logDbQueryRepresentation;

  const allLogs = { ...currentState.allLogs };
  delete allLogs[logDbQueryAsString];

  const allGraphOptions = { ...currentState.allGraphOptions };
  delete allGraphOptions[logDbQueryAsString];

  return { allLogs, allGraphOptions };
}
