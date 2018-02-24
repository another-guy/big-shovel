import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-log-entries',
  templateUrl: './log-entries.component.html',
  styleUrls: ['./log-entries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntriesComponent {

  sample =
`[
  { "$match": { "level": "ERROR" } },
  { "$group": { "_id": "$payload.employeeId", "count": { "$sum": 1 } } },
  {  "$sort": { "_id": 1 } }
]`;

  execute(): void {
  }

}
