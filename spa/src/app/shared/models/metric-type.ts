/**
 * Assumption: TimeStamp is in either of these formats:
 * 
 * `YYYY-MM-DDThh:mm:ss.msZ`
 * 
 * `YYYY-MM-DDThh:mm:ss`
 */
export type TimeStamp = string;

export interface Metric {
  name: string;
  timestampParseFormat: string;
  timestampDisplayFormat: string;
  getKey: (timestamp: TimeStamp) => string;
};

export const dailyMetric: Metric = {
  name: 'day',
  timestampParseFormat: '%Y-%m-%d',
  timestampDisplayFormat: '%Y-%m-%d',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 10),
};

export const hourlyMetric: Metric = {
  name: 'hour',
  timestampParseFormat: '%Y-%m-%dT%H',
  timestampDisplayFormat: '%Y-%m-%d %H',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 13),
};

export const minuteMetric: Metric = {
  name: 'minute',
  timestampParseFormat: '%Y-%m-%dT%H:%M',
  timestampDisplayFormat: '%Y-%m-%d %H:%M',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 16),
};

export const METRIC_TYPES = [
  dailyMetric,
  hourlyMetric,
  minuteMetric,
];
