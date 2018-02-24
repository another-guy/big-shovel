import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent {
}
