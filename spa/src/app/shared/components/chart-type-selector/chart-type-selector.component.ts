import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CHART_TYPES } from '../../c3/config-helper';

@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTypeSelectorComponent {

  CHART_TYPES = CHART_TYPES;

  get nonPublicValue(): string { return this.value; }
  set nonPublicValue(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

}
