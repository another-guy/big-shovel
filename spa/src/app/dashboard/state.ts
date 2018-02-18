import { GraphOptions } from './models/graph-options';
import { LogEntry } from './models/log-entry';

export interface State {
  allGraphOptions: { [logDbQueryRepresentation: string]: GraphOptions }
  allLogs: { [logDbQueryRepresentation: string]: LogEntry[] };
}

export const initialState: State = {
  allGraphOptions: { },
  allLogs: { },
};
