import * as dashboard from './actions';
import { toStringRepresentation } from './models/log-db-query';
import { hourlyMetric } from './models/metric-type';
import { initialState, State } from './state';
import { AppState } from '../app.reducers';
import { GraphDataLoaded, UpdateGraphOptions, RemoveGraph } from './actions';
import { GraphOptions } from './models/graph-options';

export function reducer(currentState: State = initialState, action: dashboard.Actions): State {
  switch (action.type) {
    case dashboard.GRAPH_DATA_LOADED: return handleGraphDataLoaded(currentState, action);
    case dashboard.UPDATE_GRAPH_OPTIONS: return handleUpdateGraphOptions(currentState, action);
    case dashboard.REMOVE_GRAPH: return handleRemoveGraph(currentState, action);
    default: return currentState;
  }
}

export function handleGraphDataLoaded(currentState: State, action: GraphDataLoaded): State {
  const logDbQueryAsString = toStringRepresentation(action.logDbQuery);

  const allLogs = { ...currentState.allLogs };
  allLogs[logDbQueryAsString] = action.data;

  const allGraphOptions = { ...currentState.allGraphOptions };
  allGraphOptions[logDbQueryAsString] = { chartType: 'line', metricType: hourlyMetric };

  return { allLogs, allGraphOptions };
}

export function handleUpdateGraphOptions(currentState: State, action: UpdateGraphOptions): State {
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

export function handleRemoveGraph(currentState: State, action: RemoveGraph): State {
  const logDbQueryAsString = action.logDbQueryRepresentation;

  const allLogs = { ...currentState.allLogs };
  delete allLogs[logDbQueryAsString];

  const allGraphOptions = { ...currentState.allGraphOptions };
  delete allGraphOptions[logDbQueryAsString];

  return { allLogs, allGraphOptions };
}
