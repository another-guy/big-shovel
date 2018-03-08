import { LogEntry } from './shared/models/log-entry';

export interface LoadedLogEntryData {
  logEntryList: LogEntry[];
  error: string;
}

export interface GraphState {
  logs: { [graphId: string]: LoadedLogEntryData };
}

export const initialState: GraphState = {
  logs: { },
};
