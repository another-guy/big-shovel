import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent {

  trackByEtrackByLogEntryxpression(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }
  
  @Input() logDbQueryRepresentation: string;
  logEntries$: Store<LogEntry[]>;

  constructor(
    private _store: Store<AppState>,
  ) {
    this.logEntries$ = _store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
  }

  removeTrackedExpression(): void {
    // TODO ...
  }
}
