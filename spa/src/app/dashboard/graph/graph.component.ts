import { ChangeDetectionStrategy, Component, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as c3 from 'c3';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.reducers';
import { LogEntry } from '../models/log-entry';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent {

  trackByLogEntry(index: number, logEntry: LogEntry): string {
    return logEntry._id;
  }
  
  @Input() svgSize = { w: 600, h: 100, };

  @Input() logDbQueryRepresentation: string;
  logEntries$: Store<LogEntry[]>;
  totalLogEntryCount$: Observable<number>;

  constructor(
    private _store: Store<AppState>,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this.logEntries$ = _store.select(state => state.dashboard.allLogs[this.logDbQueryRepresentation]);
    this.totalLogEntryCount$ = this.logEntries$.map(logEntries => logEntries.length);
  }

  ngOnInit(): void {
    this.logEntries$.subscribe(logEntries => this.plot(logEntries));
  }

  removeTrackedExpression(): void {
    // TODO ...
  }

  private plot(logEntries: LogEntry[]): void {
    this.plotSvg2(logEntries);
  }

  private getPeriodKey(logEntry: LogEntry): string { return logEntry.time.split(':')[0]; }

  private groupByHours(logEntries: LogEntry[]): { [_: string]: LogEntry[] } {
    return logEntries.reduce(
        (subresult, logEntry) => {
          const periodKey = this.getPeriodKey(logEntry);
          const periodLogEntries = subresult[periodKey];
          if (periodLogEntries) {
            periodLogEntries.push(logEntry);
          } else {
            subresult[periodKey] = [ logEntry ];
          };
          return subresult;
        },
        <{ [_: string]: LogEntry[] }>{}
      );
  }

  private plotSvg2(logEntries: LogEntry[]): void {
    const rootElement = this._viewContainerRef.element.nativeElement;

    const dateAndHourlyGrouped = this.groupByHours(logEntries);
    const errors = Object.getOwnPropertyNames(dateAndHourlyGrouped).map(dateHour => dateAndHourlyGrouped[dateHour].filter(le => le.level === 'ERROR').length);
    const infos = Object.getOwnPropertyNames(dateAndHourlyGrouped).map(dateHour => dateAndHourlyGrouped[dateHour].filter(le => le.level === 'INFO').length);
    const totals = Object.getOwnPropertyNames(dateAndHourlyGrouped).map(dateHour => dateAndHourlyGrouped[dateHour].length);

    const selectedMode: string = 'bar';

    const columns = [
      [ 'ERRORS', ...errors ],
      [ 'INFOS', ...infos ],
    ];
    const groups = [
      ['ERRORS', 'INFOS'],
    ];
    const areaTypes = { 'INFOS': 'area', 'ERRORS': 'area' };
    const areaSplineTypes = { 'INFOS': 'area-spline', 'ERRORS': 'area-spline' };
    const stepTypes = { 'INFOS': 'step', 'ERRORS': 'step' };
    const colors = { 'INFOS': '#ccc', 'ERRORS': '#f00' };
    const bar = { width: { ratio: 0.8 } };
    
    let data: c3.Data = null;
    let axis: c3.Axis = null;
    switch (selectedMode) {
      case 'stacked-bar':
        data = { type: 'bar', columns, groups, colors };
        break;
      case 'stacked-area':
        data = { columns, groups, types: areaSplineTypes, colors };
        break;
      case 'area':
        data = { columns, types: areaTypes, colors };
        break;
      case 'line':
        data = { columns, colors };
        break;
      case 'spline':
        data = { type: 'spline', columns, colors };
        break;
      case 'step':
        data = { columns, types: stepTypes, colors };
        break;
      case 'bar':
        data = { type: 'bar', columns, colors };
        break;
      default:
        throw new Error(`Unsupported graph mode ${selectedMode}`);
    }

    c3.generate({
      bindto: '#svg2',
      size: {
        height: this.svgSize.h,
        width: this.svgSize.w,
      },
      data,
      axis,
      bar,
      zoom: {
        enabled: true,
      },
      subchart: {
        show: true,
      }
    });
  }
}
