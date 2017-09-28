import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { TestboxComponent } from './testbox/testbox.component';
import { StationskortComponent } from './stationskort/stationskort.component';
import { SpeedAverageHeatmapComponent } from './speed-average-heatmap/speed-average-heatmap.component';
import { AverageSpeedHeatmapAllStationsComponent } from './average-speed-heatmap-all-stations/average-speed-heatmap-all-stations.component';
import { DatePickerModule } from "ng2-datepicker";
import { StationCartypeAmountComponent } from './station-cartype-amount/station-cartype-amount.component';
import { TemplateDateTimePickerComponent } from './template-date-time-picker/template-date-time-picker.component';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { LoadingModule } from 'ngx-loading';
import { CustomGraphModule } from './custom-graph/custom-graph.module';

import { HtmChartMapComponent } from './htm-chart-map/htm-chart-map.component';
import { LineGraphMeasurementAmountComponent } from './line-graph-measurement-amount/line-graph-measurement-amount.component';

import { HtmChartComponent } from './htm-chart/htm-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DatePickerModule,
    NKDatetimeModule,
    FormsModule,
    LoadingModule,
    CustomGraphModule
  ],
  declarations: [ StationskortComponent, SpeedAverageHeatmapComponent, AverageSpeedHeatmapAllStationsComponent, StationCartypeAmountComponent,  HtmChartComponent, HtmChartMapComponent, LineGraphMeasurementAmountComponent],
  schemas: [ ],
  providers: [LoadingModule]
})
export class WidgetsModule { }
