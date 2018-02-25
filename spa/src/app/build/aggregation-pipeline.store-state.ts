import { UntypedLogEntry } from '../shared/models/untyped-log-entry';

export interface BuildAggregationPipelineState {
  logEntryList: UntypedLogEntry[],
  error: string;
}

export const initialState: BuildAggregationPipelineState = {
  logEntryList: [],
  error: null,
};
