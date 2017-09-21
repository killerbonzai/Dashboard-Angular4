import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageSpeedHeatmapAllStationsComponent } from './average-speed-heatmap-all-stations.component';

describe('AverageSpeedHeatmapAllStationsComponent', () => {
  let component: AverageSpeedHeatmapAllStationsComponent;
  let fixture: ComponentFixture<AverageSpeedHeatmapAllStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageSpeedHeatmapAllStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageSpeedHeatmapAllStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
