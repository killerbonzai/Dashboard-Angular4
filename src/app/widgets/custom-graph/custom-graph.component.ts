import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlecharts/googlecharts.service';
import { DataPoint, GraphDataService } from './graph-data.service';
import { MeasurementService } from './measurement.service';

@Component({
  selector: '[app-custom-graph]',
  templateUrl: './custom-graph.component.html',
  styleUrls: ['./custom-graph.component.css'],
  providers: [GraphDataService, MeasurementService]
})
export class CustomGraphComponent implements OnInit, WidgetComponent {
  @Input("7") id: number;
  @Input("Lav din egen graf") title: string;

  @ViewChild("chart") el: ElementRef;

  wrapper;
  measurements;

  @Input() DataOptions: DataPoint[];
  @Input() GraphTypes: string[];

  @Input() SelectedDataOptionX: DataPoint;
  @Input() SelectedDataOptionY: DataPoint;
  @Input() SelectedGraphType: string;

  constructor(private chartService: GooglechartsService, private graphDataService: GraphDataService, private measurementService: MeasurementService) {
    this.DataOptions = graphDataService.getDataPoints();
    this.measurements = this.measurementService.getMeasurements();
    this.GraphTypes = new Array<string>();
    this.GraphTypes.push("LineChart");
    this.GraphTypes.push("BarChart");
    this.GraphTypes.push("PieChart");
    this.GraphTypes.push("DonutChart");
  }

  UpdateChart(): void {
    if(this.wrapper){
      this.wrapper.setDataTable(this.getDataTableArray());
      this.wrapper.setChartType(this.SelectedGraphType);
      this.wrapper.draw(this.el.nativeElement);
    }
  }

  ngOnInit() {
    this.chartService.ChartsLoaded().then(() => {
      this.SelectedDataOptionX = this.DataOptions[0]; // Datetime
      this.SelectedDataOptionY = this.DataOptions[2]; // Speed
      this.SelectedGraphType = this.GraphTypes[0];    // LineChart

      this.wrapper = new google.visualization.ChartWrapper({ chartType: this.SelectedGraphType });

      this.wrapper.setDataTable(google.visualization.arrayToDataTable(this.getDataTableArray()));

      this.wrapper.setOptions({
        title: 'My Daily Activities',
        orientation: 'horizontal'
      });


      this.wrapper.draw(this.el.nativeElement);
    });

  }

  private getDataTableArray(){
    let datatable = new Array();
    this.measurements.forEach(element => {
      datatable.push([this.getObjectProperty(this.SelectedDataOptionX, element), this.getObjectProperty(this.SelectedDataOptionY, element)])
    });

    datatable.sort((a, b) => {
      if (a[0] === b[0]) {
        return 0;
      }
      else {
        return (a[0] < b[0]) ? -1 : 1;
      }
    });

    datatable.unshift([this.SelectedDataOptionX.dataProperty, this.SelectedDataOptionY.dataProperty]);
    return datatable;
  }

  private getObjectProperty(dataPoint: DataPoint, obj: any) {
    switch (dataPoint.dataProperty) {
      case "Tid":
        return new Date(obj.datetime);
      case "Bane":
        return Number.parseInt(obj.lane);
      case "Hastighed":
        return Number.parseInt(obj.speed);
      case "Længde":
        return Number.parseInt(obj.length);
      case "Biltype":
        return Number.parseInt(obj.class);
      case "Gap":
        return Number.parseInt(obj.wrong_dir);
      case "WrongDir":
        return Number.parseInt(obj.wrong_dir);
      case "Display":
        return Number.parseInt(obj.wrong_dir);
      case "Flash":
        return Number.parseInt(obj.wrong_dir);
      case "StationsId":
        return Number.parseInt(obj.siteid);
      default:
        break;
    }
  }

}
