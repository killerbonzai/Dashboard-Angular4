import { Component, Input, OnInit } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';

import * as $ from 'jquery';
import { Http, Response } from '@angular/http';
//used to map jsonstring to a collection of data
import 'rxjs/add/operator/map';
declare var swal: any;

@Component({
  selector: '[app-station-cartype-amount]',
  templateUrl: './station-cartype-amount.component.html',
  styleUrls: ['./station-cartype-amount.component.css']
})
export class StationCartypeAmountComponent implements WidgetComponent, OnInit {

  @Input("6") id: number;
  @Input("Antal af forskellige biltyper") title: string;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  station: string;

  datepickerOpts = {
    autoclose: true,
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'd MM yyyy',
    icon : 'fa fa-calendar'
  }

  //spinner
  showContentBool:boolean = false;
  public loading = false;

  // car types 
  private apiUrl: string;
  data: any[];
  carTypeName: string;

  // all stations
  private apiUrlStations: string = "http://adm-trafik-01.odknet.dk:2004/api/GetAllStations/Stations";
  dataStations: any[];
  selectedItem: string;
  areacode: number;

  constructor(private http: Http) {
    this.getAllStations();
  }

  ngOnInit() {
  }

  getAllStations() {
    this.http.get(this.apiUrlStations).map((res: Response) => res.json()).subscribe(data => {
      this.dataStations = data;
    })
  
  }
  getSelectedStation() {

    this.dataStations.forEach(station => {
      if (station.name == this.selectedItem ) {
        this.selectedItem = station.name;
        this.areacode = station.areacode;
      }
    });

  }

  getApiData() {
    this.loading = true;
    this.apiUrl = `http://adm-trafik-01.odknet.dk:2004/api/CarType/GetCarTypes?from=${this.dateFrom.toISOString()}&to=${this.dateTo.toISOString()}&areacode=${this.areacode}`;
    console.log(this.apiUrl)

    this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(data => {
      if(data.length < 1){
        swal ( "Ingen data fundet" ,  "Vælg andet tidspunkt" ,  "error" )
        this.loading = false;
      }
      else{
        this.data = data;
        this.loading = false;
        this.showContentBool = true;
      }
    })
  }

  switchCase(int: number) {
    switch (int) {
      case 0: {
        this.carTypeName = "Lastbil 3 akslet";
        break;
      }
      case 1: {
        this.carTypeName = "Lastbil 2 akslet";
        break;
      }
      case 2: {
        this.carTypeName = "Person- og varebil";
        break;
      }
      case 3: {
        this.carTypeName = "Lastbil 4 akslet";
        break;
      }
      case 4: {
        this.carTypeName = "Lastvognstog 2/1-3";
        break;
      }
      case 5: {
        this.carTypeName = "Lastvognstog 3/2-3";
        break;
      }
      case 6: {
        this.carTypeName = "Sættevogn 2/1";
        break;
      }
      case 7: {
        this.carTypeName = "Sættevogn 2/2";
        break;
      }
      case 8: {
        this.carTypeName = "Sættevogn 2/3";
        break;
      }
      case 9: {
        this.carTypeName = "Sættevogn 3/1-2";
        break;
      }
      case 10: {
        this.carTypeName = "Sættevogn 3/3";
        break;
      }
      case 11: {
        this.carTypeName = "Busser";
        break;
      }
      case 12: {
        this.carTypeName = "Andre køretøjer";
        break;
      }
      default: {
        this.carTypeName = "Findes ikke";
        break;
      }
    }
  }

}
