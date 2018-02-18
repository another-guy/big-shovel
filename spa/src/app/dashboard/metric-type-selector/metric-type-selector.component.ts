import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Metric, METRIC_TYPES } from '../models/metric-type';

@Component({
  selector: 'app-metric-type-selector',
  templateUrl: './metric-type-selector.component.html',
  styleUrls: ['./metric-type-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricTypeSelectorComponent {

  METRIC_TYPES = METRIC_TYPES;

  get nonPublicValue(): Metric { return this.value; }
  set nonPublicValue(newValue: Metric) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  @Input() value: Metric;
  @Output() valueChange = new EventEmitter<Metric>();

  byMetricId(metric1: Metric, metric2: Metric): boolean {
    if (metric1 == null && metric2 == null) return true;
    if (metric1 == null || metric2 == null) return false;
    return metric1.name === metric2.name;
  }

}
