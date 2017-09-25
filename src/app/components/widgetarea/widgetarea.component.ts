import { Component, ViewChild, OnInit } from '@angular/core';
import { WidgetItem } from './../../services/widgetlibrary-service/widget-item';
import { WidgetComponent } from './../../services/widgetLibrary-service/widget.component';
import { WidgetHostDirective } from './../../directives/widget-host.directive';
import { WidgetLibraryService } from '../../services/widgetLibrary-service/widget-library.service';
import { DashboardcontrollerService } from "../../services/dashboardcontroller-service/dashboardcontroller.service";

@Component({
  selector: 'app-widgetarea',
  templateUrl: './widgetarea.component.html',
  styleUrls: ['./widgetarea.component.css']
})
export class WidgetareaComponent implements OnInit {
  @ViewChild(WidgetHostDirective) widgetHost: WidgetHostDirective;

  activeWidgets: number[]; //Ids of widgets
  contentHeader: boolean; //If the small top widgets should be included
  numCols: number; //Number of colons available - To do. Not implemented in html

  constructor(
    private widgetService: WidgetLibraryService,
    private dashboardController: DashboardcontrollerService) {

    //Set type of dashboard
    let activeDashboard = this.dashboardController.getActiveDashboard();
    if (activeDashboard) {
      this.setContentVariables(this.dashboardController.getActiveDashboard().type);
    }
    //Wire up event handler
    this.dashboardController.addWidgetEvent = (widgetId: number) => this.addWidget(widgetId);
    this.dashboardController.removeWidgetEvent = (widgetId: number) => this.removeWidget(widgetId);
    this.dashboardController.changeDashboardEvent = () => this.changeDashboard();
    this.activeWidgets = [];
  }

  ngOnInit() {
    //If  active dashboard
    if (this.dashboardController.getActiveDashboard()) {
      //spawn in all widgets from config
      this.dashboardController.getActiveDashboard().widgets.forEach(widgetId => {
        this.addWidget(widgetId);
      });
    }
  }

  private addWidget(widgetId: number) {
    //If no active dashboard
    if (!this.dashboardController.getActiveDashboard()) { return; }

    //Get Widget
    let widget: WidgetItem = this.widgetService.getWidgetbyId(widgetId);
    if(widget){
      //Resolve component
      let viewContainerRef = this.widgetHost.viewContainerRef;

      //Create component into DOM and set values.
      let componentRef = viewContainerRef.createComponent(widget.factory);
      (<WidgetComponent>componentRef.instance).id = widget.id;
      (<WidgetComponent>componentRef.instance).title = widget.title;

      //Add to active Widgets list
      this.activeWidgets.push(widget.id);
      }    
  }

  private removeWidget(widgetId: number) {
    //console.log(this.activeWidgets[0] + " -" + this.activeWidgets[1])
    //If no active dashboard
    if (!this.dashboardController.getActiveDashboard()) { return; }

    //Resolve the component.
    let viewContainerRef = this.widgetHost.viewContainerRef;

    //Find Widget index on active list --------------------- this sometimes causes a bug
    let activeWidgetIndex: number;
    for (var index = 0; index < this.activeWidgets.length; index++) {
      if (this.activeWidgets[index] == widgetId) {
        activeWidgetIndex = index;
        break;
      }
    }

    //Remove it from the widgetarea by index.
    this.activeWidgets.splice(activeWidgetIndex, 1);
    viewContainerRef.remove(activeWidgetIndex);
  }

  //Clear the area, get the active dashboard and spawn in widgets from that
  private changeDashboard() {
    this.clearArea();
    let activeDashboard = this.dashboardController.getActiveDashboard();
    if (activeDashboard != undefined) {
      this.setContentVariables(activeDashboard.type);
      //this.activeWidgets = activeDashboard.widgets;
      activeDashboard.widgets.forEach(widgetId => {
        this.addWidget(widgetId);
      });
    }
  }

  //Clears area from widgets and contentHeader and numCols variables.
  private clearArea() {
    this.contentHeader = false;
    this.numCols = 0;
    this.activeWidgets.length = 0;
    let viewContainerRef = this.widgetHost.viewContainerRef;
    let componentRef = viewContainerRef.clear();
  }

  //Sets contentHeader and numCols variables according to dashboardtype
  private setContentVariables(type: number) {
    if(type == 1){
      this.contentHeader = false;
      this.numCols = 1;
    } 
    else if(type == 2){
      this.contentHeader = false;
      this.numCols = 2;
    }
    else if(type == 3){
      this.contentHeader = true;
      this.numCols = 1;
    }
    else if(type == 4){
      this.contentHeader = true;
      this.numCols = 2;
    }
    else{
    }

    //Bug City - Enums doesnt work sometimes in switch case.
    /*switch (type) {
      case DashboardType.Standard1Col:
        this.contentHeader = false;
        this.numCols = 1;
        break;
      case DashboardType.Standard2Col:
        this.contentHeader = false;
        this.numCols = 2;
        break;
      case DashboardType.TopWidgets1Col:
        this.contentHeader = true;
        this.numCols = 1;
        break;
      case DashboardType.TopWidgets2Col:
        this.contentHeader = true;
        this.numCols = 2;
        break;
      default:
      console.log("hello darkness")
        break;
    } */
  }
}