import { WidgetComponent } from './widget.component';
import { Type, ComponentFactory } from '@angular/core';

//WidgetItem. Container for holding values when they need to be injected into DOM.
export class WidgetItem {
    constructor(
        public factory: ComponentFactory<any>, 
        public id: number, 
        public title: string) { }
}