import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducers';
import { LogEntries } from '../state';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent {
  @Input() expression: string;
  logEntries$: Store<LogEntries>;

  constructor(
    private _store: Store<AppState>,
  ) {
    this.logEntries$ = _store.select(state => state.dashboard.allLogs[this.expression]);
  }

  removeTrackedExpression(): void {
    // TODO ...
  }
}
