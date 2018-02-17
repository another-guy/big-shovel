import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';

@Component({
  selector: 'app-log-entry-list',
  templateUrl: './log-entry-list.component.html',
  styleUrls: ['./log-entry-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntryListComponent {

  @Input() logDbQueryRepresentation: string;

  logEntries$: Store<LogEntry[]>;

  constructor(
    private _store: Store<AppState>,
  ) {
    this.logEntries$ = this._store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
  }
  
  trackByLogEntry(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }

}
