import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphMeasurementAmountComponent } from './line-graph-measurement-amount.component';

describe('LineGraphMeasurementAmountComponent', () => {
  let component: LineGraphMeasurementAmountComponent;
  let fixture: ComponentFixture<LineGraphMeasurementAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineGraphMeasurementAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGraphMeasurementAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
