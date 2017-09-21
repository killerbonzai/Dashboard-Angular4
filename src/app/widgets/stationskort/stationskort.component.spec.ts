import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationskortComponent } from './stationskort.component';

describe('StationskortComponent', () => {
  let component: StationskortComponent;
  let fixture: ComponentFixture<StationskortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationskortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationskortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
