import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlecharts/googlecharts.service';
import { FiltersService } from './components/filters/filters.service';
import { GroupsService } from './components/groups/groups.service';
import { DataPoint, GraphDataService } from './graph-data.service';
import { MeasurementService } from './measurement.service';

@Component({
  selector: '[app-custom-graph]',
  templateUrl: './custom-graph.component.html',
  styleUrls: ['./custom-graph.component.css'],
  providers: [FiltersService, GraphDataService, MeasurementService, GroupsService],
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
  labelX: string = "";
  labelY: string = "";

  dateFrom: Date = new Date("06/01/2017 15:00:00");
  dateTo: Date = new Date();

  constructor(private chartService: GooglechartsService, private graphDataService: GraphDataService, private measurementService: MeasurementService, private filtersservice: FiltersService, private groupsservice: GroupsService) {
    this.DataOptions = graphDataService.getDataPoints();
    this.GraphTypes = new Array<string>();
    this.GraphTypes.push("LineChart");
    this.GraphTypes.push("BarChart");
    this.GraphTypes.push("ColumnChart");
    this.GraphTypes.push("PieChart");
    this.GraphTypes.push("AreaChart");
    this.GraphTypes.push("CalendarChart");
    this.GraphTypes.push("SteppedChart");
    this.GraphTypes.push("ScatterChart");
    window.addEventListener("resize", () => {
      this.UpdateChart();
    });
  }

  UpdateChart(): void {
    if (this.wrapper) {
      this.measurements = this.measurementService.getMeasurements();
      this.groupsservice.amountArray.forEach((val, key)=>{this.groupsservice.amountArray[key.toString()]=0;});
      this.wrapper.setDataTable(this.getDataTableArray());
      this.wrapper.setChartType(this.SelectedGraphType);
      this.wrapper.draw(this.el.nativeElement);
    }
  }

  ngOnInit() {
    this.chartService.ChartsLoaded().then(() => {
      this.SelectedDataOptionX = this.DataOptions[0]; // Datetime
      this.SelectedDataOptionY = this.DataOptions[3]; // Speed
      this.SelectedGraphType = this.GraphTypes[0];    // LineChart

      this.wrapper = new google.visualization.ChartWrapper({ chartType: this.SelectedGraphType });
    });

  }

  private getDataTableArray() {
    let datatable = new Array();
    this.measurements.forEach(element => {
      if (this.filtersservice.wrongdir == (element.wrong_dir == 0 ? false : true) && (this.filtersservice.lanes.indexOf(element.lane) >= 0)) {
        if (this.groupsservice.group) {
          this.groupsservice.groupRanges.forEach((val, key) => {
            if (this.getObjectProperty(this.SelectedDataOptionX, element) >= val.start && this.getObjectProperty(this.SelectedDataOptionX, element) <= val.end)
              this.groupsservice.amountArray[key.toString()]++;
          });
        } else {
          datatable.push([this.getObjectProperty(this.SelectedDataOptionX, element), this.getObjectProperty(this.SelectedDataOptionY, element)]);
        }
      }
    });

    if (this.groupsservice.group) {
      this.groupsservice.amountArray.forEach((val, key) => {
        datatable.push([this.groupsservice.groupRangesLabel.get(key), val]);
      });
    } else {
      datatable.sort((a, b) => {
        if (a[0] === b[0]) {
          return 0;
        }
        else {
          return (a[0] < b[0]) ? -1 : 1;
        }
      });
    }



    datatable.unshift([this.labelX, this.labelY]);
    return datatable;
  }

  private getObjectProperty(dataPoint: DataPoint, obj: any) {
    switch (dataPoint.dataProperty) {
      case "Tid":
        return new Date(obj.datetime);
      case "VehicleId":
        return Number.parseInt(obj.vehicleid);
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
