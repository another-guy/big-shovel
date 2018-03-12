import { LogEntry } from './shared/models/log-entry';
import { GraphOptions } from './shared/models/graph-options';

export interface LoadedLogEntryData {
  logEntryList: LogEntry[]; // TODO ... UntypedLogEntry[]
  error: string;
}

export type AllLogs = { [graphId: string]: LoadedLogEntryData };

export type AllOptions = { [graphId: string]: GraphOptions };

export interface GraphState {
  logs: AllLogs;
  options: AllOptions;
}

export const initialState: GraphState = {
  logs: { },
  options: { },
};
