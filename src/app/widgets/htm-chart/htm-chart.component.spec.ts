import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmChartComponent } from './htm-chart.component';

describe('HtmChartComponent', () => {
  let component: HtmChartComponent;
  let fixture: ComponentFixture<HtmChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
