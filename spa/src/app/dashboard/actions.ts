import { Action } from '@ngrx/store';

import { GraphOptions } from './models/graph-options';
import { LogDbQuery } from './models/log-db-query';
import { LogEntry } from './models/log-entry';

export const ADD_GRAPH = 'add-graph';
export const GRAPH_DATA_LOADED = 'graph-data-loaded';
export const UPDATE_GRAPH_OPTIONS = 'update-graph-options';

export class AddGraph implements Action {
  readonly type = ADD_GRAPH;
  constructor(public logDbQuery: LogDbQuery) { }
}

export class GraphDataLoaded implements Action {
  readonly type = GRAPH_DATA_LOADED;
  constructor(public logDbQuery: LogDbQuery, public data: LogEntry[]) { }
}

export class UpdateGraphOptions implements Action {
  readonly type = UPDATE_GRAPH_OPTIONS;
  constructor(public logDbQueryRepresentation: string, public options: GraphOptions) { }
}

export type Actions =
  AddGraph |
  GraphDataLoaded |
  UpdateGraphOptions;
