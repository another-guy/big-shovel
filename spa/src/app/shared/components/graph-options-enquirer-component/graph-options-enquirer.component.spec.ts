import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOptionsEnquirerComponent } from './graph-options-enquirer.component';

describe('GraphOptionsEnquirerComponent', () => {
  let component: GraphOptionsEnquirerComponent;
  let fixture: ComponentFixture<GraphOptionsEnquirerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphOptionsEnquirerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOptionsEnquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
