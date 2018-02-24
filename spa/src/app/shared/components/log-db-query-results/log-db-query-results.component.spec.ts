import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDbQueryResultsComponent } from './log-db-query-results.component';

describe('LogDbQueryResultsComponent', () => {
  let component: LogDbQueryResultsComponent;
  let fixture: ComponentFixture<LogDbQueryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDbQueryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDbQueryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
