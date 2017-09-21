import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCartypeAmountComponent } from './station-cartype-amount.component';

describe('StationCartypeAmountComponent', () => {
  let component: StationCartypeAmountComponent;
  let fixture: ComponentFixture<StationCartypeAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationCartypeAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationCartypeAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
