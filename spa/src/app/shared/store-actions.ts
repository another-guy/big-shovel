import { HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { GraphOptions } from './models/graph-options';
import { LogEntry } from './models/log-entry';

export const ADD_GRAPH = 'add-graph';
export const GRAPH_DATA_LOADED = 'graph-data-loaded';
export const UPDATE_GRAPH_OPTIONS = 'update-graph-options';
export const REMOVE_GRAPH = 'remove-graph';
export const REDRAW_GRAPH = 'redraw-graph';

export class AddGraph implements Action {
  readonly type = ADD_GRAPH;
  constructor(
    public query: string,
    public graphId: string,
  ) { }
}

export class GraphDataLoaded implements Action {
  readonly type = GRAPH_DATA_LOADED;
  constructor(
    public graphId: string,
    public data: LogEntry[], // TODO Next step USE UntypedLogEntry[]
    public errorResponse: HttpResponse<any>,
  ) { }
}

export class UpdateGraphOptions implements Action {
  readonly type = UPDATE_GRAPH_OPTIONS;
  constructor(
    public graphId: string,
    public options: GraphOptions,
  ) { }
}

export class RemoveGraph implements Action {
  readonly type = REMOVE_GRAPH;
  constructor(
    public graphId: string,
  ) { }
}

export class RedrawGraph implements Action {
  readonly type = REDRAW_GRAPH;
  constructor(
    public graphId: string,
  ) { }
}

export type Actions =
  AddGraph |
  GraphDataLoaded |
  UpdateGraphOptions |
  RemoveGraph |
  RedrawGraph;
