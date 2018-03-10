import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.store-state';
import { LoadedLogEntryData } from '../../../graph.store-state';
import { GraphOptions } from '../../../shared/models/graph-options';
import { AddGraph } from '../../../shared/store-actions';

@Component({
  selector: 'app-aggregation-pipeline',
  templateUrl: './aggregation-pipeline.component.html',
  styleUrls: ['./aggregation-pipeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationPipelineComponent {

  sample =
`[
  { "$match": { "level": "ERROR" } },
  { "$group": { "_id": "$payload.employeeId", "count": { "$sum": 1 } } },
  {  "$sort": { "_id": 1 } }
]`;

  aggregationPipeline: string;
  graphId: string = `builder`;

  error$: Observable<string>;
  list$: Observable<any[]>;
  listHeader$: Observable<string[]>;
  options$: Observable<GraphOptions>; // TODO Use me!!!
  
  constructor (
    private _store: Store<AppState>,
  ) {
    const graphLogs$ = this._store.select(state => state.graph.logs[this.graphId] || ({} as LoadedLogEntryData));
    this.options$ = this._store.select(state => state.graph.options[this.graphId] || ({} as GraphOptions));
    
    this.error$ = graphLogs$.map(state => state.error);
    this.list$ = graphLogs$.map(state => state.logEntryList);
    this.listHeader$ = this.list$.map(logEntryList => Object.getOwnPropertyNames(logEntryList && logEntryList.length > 0 ? logEntryList[0] : {}));
  }

  execute(): void {
    this._store.dispatch(new AddGraph(this.aggregationPipeline, this.graphId));
  }

}
