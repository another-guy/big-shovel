import { ActionReducerMap } from '@ngrx/store';

import { reducer as DashboardReducer } from './dashboard/reducer';
import { State as DashboardState } from './dashboard/state';

export interface AppState {
  dashboard: DashboardState;
}

export const appReducers: ActionReducerMap<AppState> = {
  dashboard: DashboardReducer,
};
