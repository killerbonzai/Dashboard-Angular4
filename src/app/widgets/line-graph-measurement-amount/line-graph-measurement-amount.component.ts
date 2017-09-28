import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlechart/googlechart.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: '[app-line-graph-measurement-amount]',
  templateUrl: './line-graph-measurement-amount.component.html',
  styleUrls: ['./line-graph-measurement-amount.component.css']
})
export class LineGraphMeasurementAmountComponent implements WidgetComponent, OnInit {
  @Input("11") id : number;
  @Input("Linje graf antal målinger") title : string;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
