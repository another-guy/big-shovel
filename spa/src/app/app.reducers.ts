import { ActionReducerMap } from '@ngrx/store';

import { reducer as DashboardReducer } from './build/build.store-reducer';
import { State as DashboardState } from './build/build.store-state';

export interface AppState {
  dashboard: DashboardState;
}

export const appReducers: ActionReducerMap<AppState> = {
  dashboard: DashboardReducer,
};
