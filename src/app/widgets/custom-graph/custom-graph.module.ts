import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { WidgetcontainerComponent } from './components/widgetcontainer/widgetcontainer.component';
import { CustomGraphComponent } from './custom-graph.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ WidgetcontainerComponent, CustomGraphComponent ],
  exports: [ CustomGraphComponent ]
})
export class CustomGraphModule { }
