import { Action } from '@ngrx/store';

import { LogEntries } from './state';

export const ADD_GRAPH = 'add-graph';
export const LOAD_GRAPH_DATA = 'load-graph-data';
export const GRAPH_DATA_LOADED = 'graph-data-loaded';

type Expression = string;

export class AddGraph implements Action {
  readonly type = ADD_GRAPH;
  constructor(public expression: Expression) { }
}

export class LoadGraphData implements Action {
  readonly type = LOAD_GRAPH_DATA;
  constructor(public expression: Expression) { }
}

export class GraphDataLoaded implements Action {
  readonly type = GRAPH_DATA_LOADED;
  constructor(public expression: Expression, public data: LogEntries) {} // TODO any
}

export type Actions =
  AddGraph |
  LoadGraphData |
  GraphDataLoaded;
