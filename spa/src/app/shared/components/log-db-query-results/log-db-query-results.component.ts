import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-db-query-results',
  templateUrl: './log-db-query-results.component.html',
  styleUrls: ['./log-db-query-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogDbQueryResultsComponent {

  @Input() graphId: string;

}
