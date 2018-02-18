import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducers';
import { UpdateGraphOptions } from '../actions';
import { hourlyMetric, Metric } from '../models/metric-type';

@Component({
  selector: 'app-graph-options',
  templateUrl: './graph-options.component.html',
  styleUrls: ['./graph-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphOptionsComponent {

  @Input() logDbQueryRepresentation: string;

  autoDispatchOnChange: boolean = true;

  private _chartType: string = 'line';
  get chartType(): string {
    return this._chartType;
  }
  set chartType(newValue: string) {
    this._chartType = newValue;
    this.tryEmit();
  }
  
  private _metricType: Metric = hourlyMetric;
  get metricType(): Metric {
    return this._metricType;
  }
  set metricType(newValue: Metric) {
    this._metricType = newValue;
    this.tryEmit();
  }

  constructor(
    private _store: Store<AppState>,
  ) { }

  private tryEmit() {
    if (this.autoDispatchOnChange) {
      this.dispatch();
    }
  }

  dispatch(): void {
    this._store.dispatch(new UpdateGraphOptions(this.logDbQueryRepresentation, { chartType: this.chartType, metricType: this.metricType }));
  }
}
