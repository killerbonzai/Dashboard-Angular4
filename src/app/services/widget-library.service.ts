import { WidgetItem } from './widget-item';
import { WidgetComponent } from './widget.component';
import { Injectable } from '@angular/core';
import { TestboxComponent } from './../components/widgets/testbox/testbox.component';

@Injectable()
export class WidgetLibraryService {
  widgets: WidgetItem[];
  widgetsToBeSpawned: WidgetItem[];
  widgetsToBeRemoved: WidgetItem[];
  public spawn: { (): void; }; //<--- acts like a delegate that will fire event
  public remove: { (): void; }; //<--- acts like a delegate that will fire event

  constructor() {
    //init the array
    this.widgets = [];
    this.widgetsToBeSpawned = [];
    this.widgetsToBeRemoved = [];
    //Register all widgets here
    this.widgets.push(new WidgetItem(TestboxComponent, 1, 'Test Boks 1'));
    //--------> Add more here

    //Sort array based on title name
    this.widgets.sort(function (a, b) {
      var nameA = a.title.toUpperCase();
      var nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      //same names
      return 0;
    });
  }

  spawnWidget(id: number) {
    for (var index = 0; index < this.widgets.length; index++) {
      if (this.widgets[index].id == id) {
        this.widgetsToBeSpawned.push(this.widgets[index]);
        this.spawn();
        break;
      }
    }
  }

  removeWidget(id: number) {
    for (var index = 0; index < this.widgets.length; index++) {
      if (this.widgets[index].id == id) {
        this.widgetsToBeRemoved.push(this.widgets[index]);
        this.remove();
        break;
      }
    }
  }
}