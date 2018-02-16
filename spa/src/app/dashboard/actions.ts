import { Action } from '@ngrx/store';

import { LogDbQuery } from './models/log-db-query';
import { LogEntry } from './models/log-entry';

export const ADD_GRAPH = 'add-graph';
export const LOAD_GRAPH_DATA = 'load-graph-data';
export const GRAPH_DATA_LOADED = 'graph-data-loaded';

export class AddGraph implements Action {
  readonly type = ADD_GRAPH;
  constructor(public logDbQuery: LogDbQuery) { }
}

export class LoadGraphData implements Action {
  readonly type = LOAD_GRAPH_DATA;
  constructor(public logDbQuery: LogDbQuery) { }
}

export class GraphDataLoaded implements Action {
  readonly type = GRAPH_DATA_LOADED;
  constructor(public logDbQuery: LogDbQuery, public data: LogEntry[]) {}
}

export type Actions =
  AddGraph |
  LoadGraphData |
  GraphDataLoaded;
