import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationPipelineComponent } from './aggregation-pipeline.component';

describe('AggregationPipelineComponent', () => {
  let component: AggregationPipelineComponent;
  let fixture: ComponentFixture<AggregationPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
