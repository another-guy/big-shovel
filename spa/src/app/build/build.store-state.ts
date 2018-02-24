import { GraphOptions } from '../shared/models/graph-options';
import { LogEntry } from '../shared/models/log-entry';

export interface LoadedLogEntryData {
  logEntryList: LogEntry[];
  error: string;
}

export interface State {
  allGraphOptions: { [logDbQueryRepresentation: string]: GraphOptions }
  allLogs: { [logDbQueryRepresentation: string]: LoadedLogEntryData };
}

export const initialState: State = {
  allGraphOptions: { },
  allLogs: { },
};
