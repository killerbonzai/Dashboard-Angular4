import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedAverageHeatmapComponent } from './speed-average-heatmap.component';

describe('SpeedAverageHeatmapComponent', () => {
  let component: SpeedAverageHeatmapComponent;
  let fixture: ComponentFixture<SpeedAverageHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedAverageHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedAverageHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
