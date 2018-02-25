import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.reducers';
import { Metric } from '../../models/metric-type';
import { RedrawGraph, UpdateGraphOptions } from '../../store-actions';

@Component({
  selector: 'app-graph-options',
  templateUrl: './graph-options.component.html',
  styleUrls: ['./graph-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphOptionsComponent {

  @Input() logDbQueryRepresentation: string;

  autoRedrawGraph: boolean = true;

  chartType$: Observable<string>;
  setChartType(newValue: string) {
    this.dispatch(newValue, undefined);
  }
  
  metricType$: Observable<Metric>;
  setMetricType(newValue: Metric) {
    this.dispatch(undefined, newValue);
  }

  requestRedrawGraph(): void {
    this._store.dispatch(new RedrawGraph(this.logDbQueryRepresentation));
  }

  constructor(
    private _store: Store<AppState>,
  ) {
    const groupOptions = this._store.select(state => state.buildTimeseries.allGraphOptions[this.logDbQueryRepresentation]);
    this.chartType$ = groupOptions.select(options => options && options.chartType);
    this.metricType$ = groupOptions.select(options => options && options.metricType);
  }

  dispatch(chartType: string, metricType: Metric): void {
    this._store.dispatch(new UpdateGraphOptions(this.logDbQueryRepresentation, { chartType, metricType }));
    if (this.autoRedrawGraph) {
      this.requestRedrawGraph();
    }
  }
}
