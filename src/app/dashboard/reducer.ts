import * as dashboard from './actions';
import { initialState, State } from './state';

export function reducer(currentState: State = initialState, action: dashboard.Actions): State {
  switch (action.type) {

    case dashboard.GRAPH_DATA_LOADED:
      const allLogs = { ...currentState.allLogs };
      allLogs[action.expression] = action.data;
      return { allLogs };

    default:
        return currentState;
  }
}
