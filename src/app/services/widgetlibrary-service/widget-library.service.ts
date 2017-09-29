import { Injectable, CompilerFactory, Compiler } from '@angular/core';
import { WidgetItem } from './widget-item';

import {WidgetsModule} from '../../widgets/widgets.module';

@Injectable()
export class WidgetLibraryService {
  private widgets: Map<number, WidgetItem>;
  private compiler: Compiler;

  constructor(cFactory: CompilerFactory) {
    this.widgets = new Map<number, WidgetItem>();

    //Register all widgets here
    this.compiler = cFactory.createCompiler();
    
      let fac = this.compiler.compileModuleAndAllComponentsSync(WidgetsModule);
      
      fac.componentFactories.forEach((facto) => {
        let title = facto.inputs.find((obj) => {return obj.propName === "title"});
        let i = (facto.inputs.find((obj) => {return obj.propName === "id"}));

        if (title) {
          let id = Number.parseInt(i.templateName);
          let wItem = new WidgetItem(facto, id, title.templateName);
          this.widgets.set(id, wItem);
        }
      });
      console.log("generated widgets");
  }

  public getWidgetbyId(widgetId: number): WidgetItem {
    return this.widgets.get(widgetId);
  }

  public getWidgetIds(): Array<number>{
    return Array.from(this.widgets.keys());
  }
}