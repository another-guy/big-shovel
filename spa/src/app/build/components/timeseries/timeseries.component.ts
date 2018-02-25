import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.reducers';
import { Actions, AddGraph } from '../../../shared/store-actions';

const DEFAULT_EXPRESSION = '{}';
const DEFAULT_SORT = '{}';

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeseriesComponent {

  queryString: string;
  sortOptionsString: string;
  logDbQueryRepresentationList$: Observable<string[]>;

  trackByExpression(index: number, expression: string): string {
    return expression;
  }

  constructor(
    private _store: Store<AppState>,
  ) {
    this.clearExpression();
    this.logDbQueryRepresentationList$ = _store.select(state => Object.getOwnPropertyNames(state.buildTimeseries.allLogs));
  }

  private dispatch(action: Actions): void {
    this._store.dispatch(action);
  }

  clearExpression(): void {
    this.queryString = DEFAULT_EXPRESSION;
    this.sortOptionsString = DEFAULT_EXPRESSION;
  }

  addExpression(): void {
    this.dispatch(new AddGraph({ query: this.queryString, sortOptions: this.sortOptionsString }));
  }
}
