import { Expression } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.reducers';
import { Actions, AddGraph } from './actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  expression = '';
  expressionList$: Observable<string[]>;

  trackByExpression(index: number, expression: string): any {
    return expression;
  }

  constructor(
    private _store: Store<AppState>,
  ) {
    this.expressionList$ = _store.select(state => Object.getOwnPropertyNames(state.dashboard.allLogs));
  }

  private dispatch(action: Actions): void {
    this._store.dispatch(action);
  }

  addExpression(): void {
    this.dispatch(new AddGraph(this.expression));
    this.expression = '';
  }
}
