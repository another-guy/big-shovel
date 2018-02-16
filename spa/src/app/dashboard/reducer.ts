import * as dashboard from './actions';
import { toStringRepresentation } from './models/log-db-query';
import { initialState, State } from './state';

export function reducer(currentState: State = initialState, action: dashboard.Actions): State {
  switch (action.type) {

    case dashboard.GRAPH_DATA_LOADED:
      const allLogs = { ...currentState.allLogs };
      allLogs[toStringRepresentation(action.logDbQuery)] = action.data;
      return { allLogs };

    default:
        return currentState;
  }
}
