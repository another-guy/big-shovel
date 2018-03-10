import { LogEntry } from './shared/models/log-entry';
import { GraphOptions } from './shared/models/graph-options';

export interface LoadedLogEntryData {
  logEntryList: LogEntry[]; // TODO ... UntypedLogEntry[]
  error: string;
}

export interface GraphState {
  logs: { [graphId: string]: LoadedLogEntryData };
  options: { [graphId: string]: GraphOptions };
}

export const initialState: GraphState = {
  logs: { },
  options: { },
};
