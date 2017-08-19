import { Component, OnInit } from '@angular/core';
import { WidgetLibraryService } from '../../services/widget-library.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  dashboards: MenuElement[];
  activeWidgets: MenuElement[];
  allWidgets: MenuElement[];

  constructor(private widgetService:WidgetLibraryService) {
    //Init properties
    this.dashboards = [];
    this.activeWidgets = [];
    this.allWidgets = [];
  }

  ngOnInit() {
    //Convert all widgets to MenuElements from WidgetLibrary
    for (var index = 0; index < this.widgetService.widgets.length; index++) {
      let element = new MenuElement(false, this.widgetService.widgets[index].title);
      //Add to allWidgets
      this.allWidgets.push(element);
    }
    
    //TO DO: Fill all properties in activeWidgets according to user configuration

    //Test Data - Dashboard
    this.dashboards.push(new MenuElement(true, "Oversigt"));
    this.dashboards.push(new MenuElement(true, "Kun Kort"));
  }

  newDashboard(){
    //TO DO
  }

  removeDashboard(dashboard){
    //Check if dashboard exists
    if(this.dashboards.includes(dashboard)){
      //Remove it
      for (var index = 0; index < this.dashboards.length; index++) {
        if(this.dashboards[index] == dashboard){
          this.dashboards.splice(index,1);
          break; // found, stop loop
        }
      }
    }
    //TO DO: Save to user configuration
  }

  //Adds widget to active list
  addWidget(widget: MenuElement) {
    //Check if its already on the list - disallow adding it more times
    if (!this.activeWidgets.includes(widget)) {
      //put it on activelist if it doesnt
      this.activeWidgets.push(widget);
    }
    //TO DO: Save to user configuration
  }

  removeWidget(widget: MenuElement) {
    //Check if widget exists
    if(this.activeWidgets.includes(widget)){
      //Remove it
      for (var index = 0; index < this.activeWidgets.length; index++) {
        if(this.activeWidgets[index] == widget){
          this.activeWidgets.splice(index,1);
          break; // found, stop loop
        }
      }
    }
    //TO DO: Save to user configuration
  }
}

class MenuElement {
  removeable: boolean;
  titel: string;

  constructor(removeable: boolean, titel: string) {
    //Init properties
    this.removeable = removeable;
    this.titel = titel;
  }
}


