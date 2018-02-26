import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-chip',
  templateUrl: './error-chip.component.html',
  styleUrls: ['./error-chip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorChipComponent {

  @Input() error: string;

}
