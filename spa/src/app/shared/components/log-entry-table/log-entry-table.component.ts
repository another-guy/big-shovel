import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-log-entry-table',
  templateUrl: './log-entry-table.component.html',
  styleUrls: ['./log-entry-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogEntryTableComponent {

  @Input() listHeader: string[];

  @ViewChild(MatSort) sort: MatSort;

  private _list: any[];
  dataSource: MatTableDataSource<any>;

  get list(): any[] {
    return this._list;
  }
  @Input() set list(newValue: any[]) {
    this._list = newValue;
    this.dataSource = new MatTableDataSource(newValue);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
