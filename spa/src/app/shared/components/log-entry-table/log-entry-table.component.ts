import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-entry-table',
  templateUrl: './log-entry-table.component.html',
  styleUrls: ['./log-entry-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntryTableComponent {

  @Input() list: any[];
  @Input() listHeader: string[];

}
