import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.reducers';
import { IdGenerator } from '../../../shared/id-generator';
import { AddAggregationPipelineGraph } from '../../../shared/store-actions';

@Component({
  selector: 'app-log-entries',
  templateUrl: './log-entries.component.html',
  styleUrls: ['./log-entries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntriesComponent {

  sample =
`[
  { "$match": { "level": "ERROR" } },
  { "$group": { "_id": "$payload.employeeId", "count": { "$sum": 1 } } },
  {  "$sort": { "_id": 1 } }
]`;

  aggregationPipeline: string;
  private _id: string;

  constructor (
    private _store: Store<AppState>,
    private _idGenerator: IdGenerator,
  ) {
    this._id = _idGenerator.nextString;
  }

  execute(): void {
    this._store.dispatch(new AddAggregationPipelineGraph(this.aggregationPipeline, this._id));
  }

}
