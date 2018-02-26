import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.reducers';
import { IdGenerator } from '../../../shared/id-generator';
import { AddAggregationPipelineGraph } from '../../../shared/store-actions';

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
  private _id: string;

  error$: Observable<string>;
  list$: Observable<any[]>;
  listHeader$: Observable<string[]>;
  
  constructor (
    private _store: Store<AppState>,
    private _idGenerator: IdGenerator,
  ) {
    this._id = _idGenerator.nextString;

    const aggregationPipeline$ = this._store.select(state => state.buildAggregationPipeline);
    
    this.error$ = aggregationPipeline$.map(aggregationPipeline => aggregationPipeline.error);
    this.list$ = aggregationPipeline$.map(aggregationPipeline => aggregationPipeline.logEntryList);
    this.listHeader$ = this.list$.map(logEntryList => Object.getOwnPropertyNames(logEntryList.length > 0 ? logEntryList[0] : {}));
  }

  execute(): void {
    this._store.dispatch(new AddAggregationPipelineGraph(this.aggregationPipeline, this._id));
  }

}
