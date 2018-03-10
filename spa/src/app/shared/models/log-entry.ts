export type LogLevel = 'INFO' | 'ERROR';

// TODO Next step -- REMOVE ME
export interface LogEntry {
  _id: string;
  time: string;
  level: LogLevel;
  payload: any;
}
