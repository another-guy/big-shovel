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
  xFormat: string;
  xTickFormat: string;
  getKey: (timestamp: TimeStamp) => string;
};

export const dailyMetric: Metric = {
  name: 'day',
  xFormat: '%Y-%m-%d',
  xTickFormat: '%Y-%m-%d',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 10),
};

export const hourlyMetric: Metric = {
  name: 'hour',
  xFormat: '%Y-%m-%dT%H',
  xTickFormat: '%Y-%m-%d %H',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 13),
};

export const minuteMetric: Metric = {
  name: 'minute',
  xFormat: '%Y-%m-%dT%H:%M',
  xTickFormat: '%Y-%m-%d %H:%M',
  getKey: (timestamp: TimeStamp) => timestamp.substring(0, 16),
};

export const METRIC_TYPES = [
  dailyMetric,
  hourlyMetric,
  minuteMetric,
];
