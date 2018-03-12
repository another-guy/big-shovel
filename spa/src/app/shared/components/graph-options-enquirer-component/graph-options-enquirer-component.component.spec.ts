import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOptionsEnquirerComponentComponent } from './graph-options-enquirer-component.component';

describe('GraphOptionsEnquirerComponentComponent', () => {
  let component: GraphOptionsEnquirerComponentComponent;
  let fixture: ComponentFixture<GraphOptionsEnquirerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphOptionsEnquirerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOptionsEnquirerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
