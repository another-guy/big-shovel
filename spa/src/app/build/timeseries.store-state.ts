import { GraphOptions } from '../shared/models/graph-options';
import { LogEntry } from '../shared/models/log-entry';

export interface BuildTimeseriesState {
  allGraphOptions: { [graphId: string]: GraphOptions }
}

export const initialState: BuildTimeseriesState = {
  allGraphOptions: { },
};
