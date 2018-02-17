import { LogEntry } from "./log-entry";

export type TimeStamp = string;

export interface Metric {
  parseFormat: string;
  displayFormat: string;
  getKey: (timestamp: TimeStamp) => string;
};

// Assumption: TimeStamp is in either of these formats:
// `YYYY-MM-DDThh:mm:ss.msZ`
// `YYYY-MM-DDThh:mm:ss`
export class AggregationKey {
  //static hourlyMetric: (timestamp: TimeStamp) => string = timestamp => timestamp.substring(0, 13);
  
  static dailyMetric: Metric = {
    parseFormat: '%Y-%m-%d',
    displayFormat: '%Y-%m-%d',
    getKey: (timestamp: TimeStamp) => timestamp.substring(0, 10),
  };

  static hourlyMetric: Metric = {
    parseFormat: '%Y-%m-%dT%H',
    displayFormat: '%Y-%m-%d %H',
    getKey: (timestamp: TimeStamp) => timestamp.substring(0, 13),
  };
  
  static minuteMetric: Metric = {
    parseFormat: '%Y-%m-%dT%H:%M',
    displayFormat: '%Y-%m-%d %H:%M',
    getKey: (timestamp: TimeStamp) => timestamp.substring(0, 16),
  };
}
