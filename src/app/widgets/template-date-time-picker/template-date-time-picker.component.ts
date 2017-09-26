import { Component, Input, OnInit } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';

import * as $ from 'jquery';

@Component({
  selector: '[app-template-date-time-picker]',
  templateUrl: './template-date-time-picker.component.html',
  styleUrls: ['./template-date-time-picker.component.css']
})
export class TemplateDateTimePickerComponent  implements WidgetComponent, OnInit {
  @Input("5") id: number;
  @Input("Widget template") title: string;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  datepickerOpts = {
    autoclose: true,
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'd MM yyyy',
    icon : 'fa fa-calendar'
  }

private apiUrl: string;
selectedStation : string;

  constructor() { }

  ngOnInit() {
  }

 //test
  getDate(dt: Date): string {
    return dt.toISOString().slice(0,10) + " " +  dt.getHours() + ":" + (dt.getMinutes()<10?'0':'') + dt.getMinutes();
  }

  getApiData(){
    this.apiUrl = `http://adm-trafik-01.odknet.dk:1000/api/InsertRealController/InsertRealActioName?from=${this.dateFrom.toISOString()}&to=${this.dateTo.toISOString()}&station=${this.selectedStation}`;
  }


}
