import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GmapSAASService } from './gmap.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';
declare var swal: any;

@Component({
  selector: '[app-average-speed-heatmap-all-stations]',
  templateUrl: './average-speed-heatmap-all-stations.component.html',
  styleUrls: ['./average-speed-heatmap-all-stations.component.css'],
  providers: [GmapSAASService]
})
export class AverageSpeedHeatmapAllStationsComponent implements OnInit, OnDestroy {
  @Input("4") id: number;
  @Input("Alle stationer: Gennemsnitshastighed") title: string;
  @ViewChild('map') mapRef: ElementRef;

  markersRed: any = [];
  markersGreen: any = [];
  markersYellow: any = [];
  private apiUrl;

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
  //spinner
  showContentBool: boolean = false;
  public loading = false;

  constructor(private gmapSAService: GmapSAASService, private http: Http) {
  }

  ngOnInit() {
    this.initGoogleMap();
  }

  ngOnDestroy() {
    this.gmapSAService.delete();
  }

  onClick() {
    this.loading = true;
    this.apiUrl = `http://adm-trafik-01.odknet.dk:2003/api/AverageSpeed/GetMeasurementsBetweenDatesAllStations?from=${this.dateFrom.getHours()}&to=${this.dateTo.toISOString()}`;
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
    this.gmapSAService.clearHeatmaps();
    this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(response => {

      if (response) {
        Array.from(response).forEach((marker, i) => {
          if (marker['measurement'] < 45 && marker['measurement'] > 1) {
            this.markersYellow.push(marker)
          }
          else if (marker['measurement'] <= 55 && marker['measurement'] >= 45) {
            this.markersGreen.push(marker)
          }
          else if (marker['measurement'] > 55) {
            this.markersRed.push(marker)
          }
        });
      }
      if (this.markersGreen == 0 && this.markersRed == 0 && this.markersYellow == 0) {
        swal("Ingen data fundet", "Vælg andet tidspunkt", "error")
        this.loading = false;
      }

      this.gmapSAService.addHeatmap(this.markersGreen, 0, 255);
      this.gmapSAService.addHeatmap(this.markersYellow, 255, 255);
      this.gmapSAService.addHeatmap(this.markersRed, 255, 0);
      this.loading = false;
      this.showContentBool = true;

    })
  }
}
