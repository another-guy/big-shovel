import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricTypeSelectorComponent } from './metric-type-selector.component';

describe('MetricTypeSelectorComponent', () => {
  let component: MetricTypeSelectorComponent;
  let fixture: ComponentFixture<MetricTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
