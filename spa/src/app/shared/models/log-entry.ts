export type LogLevel = 'INFO' | 'ERROR';

export interface LogEntry {
  _id: string;
  time: string;
  level: LogLevel;
  payload: any;
}
