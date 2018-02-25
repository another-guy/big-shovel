import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntryTableComponent } from './log-entry-table.component';

describe('LogEntryTableComponent', () => {
  let component: LogEntryTableComponent;
  let fixture: ComponentFixture<LogEntryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogEntryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
