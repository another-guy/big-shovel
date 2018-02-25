import { HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { GraphOptions } from './models/graph-options';
import { LogDbQuery } from './models/log-db-query';
import { LogEntry } from './models/log-entry';
import { UntypedLogEntry } from './models/untyped-log-entry';

export const ADD_GRAPH = 'add-graph';
export const GRAPH_DATA_LOADED = 'graph-data-loaded';
export const UPDATE_GRAPH_OPTIONS = 'update-graph-options';
export const REMOVE_GRAPH = 'remove-graph';
export const REDRAW_GRAPH = 'redraw-graph';
export const SHOW_GRAPH_ERROR = 'show-graph-error';

export const ADD_AGGREGATION_PIPELINE_GRAPH = 'add-aggregation-pipeline-graph';
export const AGGREGATION_PIPELINE_GRAPH_DATA_LOADED = 'aggregation-pipeline-graph-data-loaded';
export const REDRAW_AGGREGATION_PIPELINE_GRAPH = 'redraw-aggregation-pipeline-graph';

export class AddGraph implements Action {
  readonly type = ADD_GRAPH;
  constructor(
    public logDbQuery: LogDbQuery,
  ) { }
}

export class GraphDataLoaded implements Action {
  readonly type = GRAPH_DATA_LOADED;
  constructor(
    public logDbQuery: LogDbQuery,
    public data: LogEntry[],
    public errorResponse: HttpResponse<any>,
  ) { }
}

export class UpdateGraphOptions implements Action {
  readonly type = UPDATE_GRAPH_OPTIONS;
  constructor(
    public logDbQueryRepresentation: string,
    public options: GraphOptions,
  ) { }
}

export class RemoveGraph implements Action {
  readonly type = REMOVE_GRAPH;
  constructor(
    public logDbQueryRepresentation: string,
  ) { }
}

export class RedrawGraph implements Action {
  readonly type = REDRAW_GRAPH;
  constructor(
    public logDbQueryRepresentation: string,
  ) { }
}

export class AddAggregationPipelineGraph implements Action {
  readonly type = ADD_AGGREGATION_PIPELINE_GRAPH;
  constructor(
    public aggregationPipeline: string,
    public requesterId: string,
  ) { }
}

export class AggregationPipelineGraphDataLoaded implements Action {
  readonly type = AGGREGATION_PIPELINE_GRAPH_DATA_LOADED;
  constructor(
    public aggregationPipeline: string,
    public requesterId: string,
    public logEntries: UntypedLogEntry[],
    public errorResponse: HttpResponse<any>,
  ) { }
}

export class RedrawAggregationPipelineGraph implements Action {
  readonly type = REDRAW_AGGREGATION_PIPELINE_GRAPH;
  constructor(
    public aggregationPipeline: string,
    public requesterId: string,
  ) { }
}

export type Actions =
  AddGraph |
  GraphDataLoaded |
  UpdateGraphOptions |
  RemoveGraph |
  RedrawGraph |
  
  AddAggregationPipelineGraph |
  AggregationPipelineGraphDataLoaded |
  RedrawAggregationPipelineGraph;
