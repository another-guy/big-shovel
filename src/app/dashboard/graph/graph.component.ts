import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent {
  @Input() expression: any;
  data$: any; // TODO

  expressionList$: Observable<string[]>;

  constructor(
    private _store: Store<AppState>,
  ) {
    this.data$ = _store.select(state => state.dashboard.allLogs[this.expression]);
  }
}
