import * as global from '../shared/store-actions';
import { BuildTimeseriesState, initialState } from './timeseries.store-state';

export function reducer(currentState: BuildTimeseriesState = initialState, action: global.Actions): BuildTimeseriesState {
  return currentState;
}
