import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { WidgetcontainerComponent } from './components/widgetcontainer/widgetcontainer.component';
import { CustomGraphComponent } from './custom-graph.component';
import { FiltersComponent } from './components/filters/filters.component';
import { GroupsComponent } from './components/groups/groups.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ WidgetcontainerComponent, CustomGraphComponent, FiltersComponent, GroupsComponent ],
  exports: [ CustomGraphComponent ]
})
export class CustomGraphModule { }
