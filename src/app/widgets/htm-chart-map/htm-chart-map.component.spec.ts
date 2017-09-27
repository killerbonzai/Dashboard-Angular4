import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmChartMapComponent } from './htm-chart-map.component';

describe('HtmChartMapComponent', () => {
  let component: HtmChartMapComponent;
  let fixture: ComponentFixture<HtmChartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmChartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmChartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
