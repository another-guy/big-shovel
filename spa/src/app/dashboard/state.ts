import { LogEntry } from "./models/log-entry";

export interface State {
  allLogs: { [logDbQueryRepresentation: string]: LogEntry[] };
}

export const initialState: State = {
  allLogs: { },
};
