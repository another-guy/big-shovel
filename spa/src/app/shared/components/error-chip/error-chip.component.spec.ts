import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorChipComponent } from './error-chip.component';

describe('ErrorChipComponent', () => {
  let component: ErrorChipComponent;
  let fixture: ComponentFixture<ErrorChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
