import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetcontainerComponent } from './widgetcontainer.component';

describe('WidgetcontainerComponent', () => {
  let component: WidgetcontainerComponent;
  let fixture: ComponentFixture<WidgetcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
