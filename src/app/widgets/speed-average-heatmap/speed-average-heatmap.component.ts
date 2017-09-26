import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GoogleMapsContainerService } from '../../services/googlemapscontainer/googlemapscontainer.service';
import { GmapSAService } from './gmap.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { FormsModule } from '@angular/forms';


import * as $ from 'jquery';
declare var swal: any;

@Component({
  selector: '[app-speed-average-heatmap]',
  templateUrl: './speed-average-heatmap.component.html',
  styleUrls: ['./speed-average-heatmap.component.css'],
  providers: [GmapSAService]
})

export class SpeedAverageHeatmapComponent implements OnInit, OnDestroy {
  @Input("3") id: number;
  @Input("Enkelt station: Gennemsnitshastighed") title: string;
  @ViewChild('map') mapRef: ElementRef;

  station: String;

  heatmap: google.maps.visualization.HeatmapLayer;
  data: any = [];

  // datetime picker
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  datepickerOpts = {
    autoclose: true,
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'd MM yyyy',
    icon: 'fa fa-calendar'
  }

  // all stations
  private apiUrlStations: string = "http://adm-trafik-01.odknet.dk:2001/api/GetAllStations/Stations";
  dataStations: any[];
  selectedItem: string;
  areacode: number;

  //spinner
  showContentBool: boolean = false;
  public loading = false;

  private apiUrl;

  constructor(private gmapSAService: GmapSAService, private http: Http) {
  }
  ngOnInit() {
    this.initGoogleMap();
    this.getAllStations();
  }

  ngOnDestroy() {
    this.gmapSAService.delete();
  }

  getAllStations() {
    this.http.get(this.apiUrlStations).map((res: Response) => res.json()).subscribe(data => {
      this.dataStations = data;
    })

  }
  getSelectedStation() {

    this.dataStations.forEach(station => {
      if (station.name == this.selectedItem) {
        this.selectedItem = station.name;
        this.areacode = station.areacode;
        return;
      }
    });

  }

  onClick() {
    this.loading = true;
    this.apiUrl = `http://adm-trafik-01.odknet.dk:2001/api/AverageSpeed/GetMeasurementsBetweenDates?from=${this.dateFrom.toISOString()}&to=${this.dateTo.toISOString()}&areaCode=${this.areacode}`;
    this.LoadHeatmap()

  }
  initGoogleMap() {
    (this.gmapSAService.initMap(this.title, this.mapRef.nativeElement, {
      center: { lat: 55.3931161, lng: 10.3854726 },
      scrollwheel: true,
      zoom: 11,
      minZoom: 11,
      maxZoom: 16,
      streetViewControl: false,
      mapTypeControl: false
    }, null));
  }
  LoadHeatmap(): void {
    this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(marker => {
      if(marker.name == null){
        swal("Ingen data fundet", "Vælg andet tidspunkt", "error")
        this.loading = false;
      }
      else{
        this.gmapSAService.addHeatmap(Number(marker.latitude), Number(marker.longitude), marker.measurement, marker.name);
        this.loading = false;
      }
    
    })
  }
}