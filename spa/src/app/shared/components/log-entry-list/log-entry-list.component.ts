import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.reducers';
import { LogEntry } from '../../models/log-entry';

@Component({
  selector: 'app-log-entry-list',
  templateUrl: './log-entry-list.component.html',
  styleUrls: ['./log-entry-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntryListComponent {

  @Input() logDbQueryRepresentation: string;

  logEntries$: Observable<LogEntry[]>;
  error$: Observable<string>;

  constructor(
    private _store: Store<AppState>,
  ) {
    const data = this._store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
    this.logEntries$ = data.map(loadedGraphData => loadedGraphData && loadedGraphData.logEntryList);
    this.error$ = data.map(loadedGraphData => loadedGraphData && loadedGraphData.error);
  }
  
  trackByLogEntry(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }

}
