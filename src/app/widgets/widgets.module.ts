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

@NgModule({
  imports: [
    CommonModule,
    DatePickerModule,
    NKDatetimeModule,
    FormsModule,
    LoadingModule
  ],
  declarations: [ StationskortComponent, SpeedAverageHeatmapComponent, AverageSpeedHeatmapAllStationsComponent, StationCartypeAmountComponent],
  schemas: [ ],
  providers: [LoadingModule]
})
export class WidgetsModule { }
