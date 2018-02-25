import { GraphOptions } from '../shared/models/graph-options';
import { LogEntry } from '../shared/models/log-entry';

export interface LoadedLogEntryData {
  logEntryList: LogEntry[];
  error: string;
}

export interface BuildTimeseriesState {
  allGraphOptions: { [logDbQueryRepresentation: string]: GraphOptions }
  allLogs: { [logDbQueryRepresentation: string]: LoadedLogEntryData };
}

export const initialState: BuildTimeseriesState = {
  allGraphOptions: { },
  allLogs: { },
};
