import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.reducers';
import { Actions, AddGraph } from './actions';

const ALL_EXPRESSION = '{}';
const DEFAULT_EXPRESSION = ALL_EXPRESSION;

const SORT_BY_TIME_CHRONOLOGICALLY = '{ "time": 1 }';
const DEFAULT_SORT = SORT_BY_TIME_CHRONOLOGICALLY;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  queryString = DEFAULT_EXPRESSION;
  sortOptionsString = DEFAULT_SORT;
  logDbQueryRepresentationList$: Observable<string[]>;

  trackByExpression(index: number, expression: string): string {
    return expression;
  }

  constructor(
    private _store: Store<AppState>,
  ) {
    this.logDbQueryRepresentationList$ = _store.select(state => Object.getOwnPropertyNames(state.dashboard.allLogs));
  }

  ngOnInit() {
    this.addExpression(); // TODO <---- TEMPORARY
  }

  private dispatch(action: Actions): void {
    this._store.dispatch(action);
  }

  addExpression(): void {
    this.dispatch(new AddGraph({ query: this.queryString, sortOptions: this.sortOptionsString }));
    this.queryString = DEFAULT_EXPRESSION;
    this.sortOptionsString = SORT_BY_TIME_CHRONOLOGICALLY;
  }
}
