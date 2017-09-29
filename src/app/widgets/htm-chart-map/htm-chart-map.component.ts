import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GoogleMapsContainerService } from "../../services/googlemapscontainer/googlemapscontainer.service";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
declare var swal: any;

@Component({
  selector: '[app-htm-chart-map]',
  templateUrl: './htm-chart-map.component.html',
  styleUrls: ['./htm-chart-map.component.css']
})
export class HtmChartMapComponent implements OnInit, WidgetComponent, OnDestroy {
  @Input("10") id: number;
  @Input("Anomaly map") title: string;
  @ViewChild('map') mapRef: ElementRef;

  public loading = false;
  map: google.maps.Map;
  // all stations
  private apiUrlStations: string = "http://adm-trafik-01.odknet.dk:2002/api/GetAllStations/Stations";
  dataStations: any[];
  selectedItem: string;
  areacode: number;
  private apiUrl: string;
  data: any[];
  
  // selected station info
  longi: number;
  lati: number;
  statname: string;

  constructor(private gmapService: GoogleMapsContainerService, private http: Http) {
    this.getAllStations();
    //Observable.interval(1000 * 60).subscribe(x => {
      //this.initGoogleMap();
    //});
   }

  ngOnInit() {

    this.initGoogleMap();
  }


  ngOnDestroy() {
    this.gmapService.deleteMap(this.title);
  }

  getAllStations() {
    this.http.get(this.apiUrlStations).map((res: Response) => res.json()).subscribe(data => {
      this.dataStations = data;
    })
  }

  getSelectedStation(stationsid) {
    this.dataStations.forEach(station => {
      if (station.areacode == stationsid) {
        this.statname = station.name;
        this.lati = station.latitude;
        this.longi = station.longitude;
        return;
      }});
  }

  initGoogleMap() {
    this.loading = true;
    (this.gmapService.createMap(this.title, this.mapRef.nativeElement, {
      center: { lat: 55.3931161, lng: 10.3854726 },
      scrollwheel: true,
      zoom: 11,
      minZoom: 11,
      maxZoom: 16,
      streetViewControl: false,
      mapTypeControl: false
    }).then((map) => {
      this.map = map;
      // Anderupvej: 46102360 -- Falen: 46171141

      // No "live" data after 25 september (Last checked 28 september 16:16) -------------->

        // wtf javascript. zero indexed months. 0 = january ... 8 = september
      var datefrom = new Date(2017,8,15,15,23,47,0);
      var septdate = new Date(2017,8,25,15,23,47,0);
      // ------------------------------------------------>

      this.apiUrl = `http://adm-trafik-01.odknet.dk:2011/api/Anomaly/GetAnomalies?from=${datefrom.toISOString()}&to=${septdate.toISOString()}&areacode=46102360`;
     
      var found = 0;
      this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(data => {
        this.data = data;
        if(this.data.length < 1){
          swal ( "Ingen data fundet" ,  "Vælg andet tidspunkt" ,  "error" )
          this.loading = false;
        }else{
          // map it
          var station = 0;
          this.data.forEach(element => {
            station = element.stationid;
            if (element.anomaly_likelihood as number > 0.85) {
              found++;
            }
          });
          if (found > 0) {
            this.getSelectedStation(station);
            var marker = new google.maps.Marker({
              position: {lat: this.lati, lng: this.longi},
              map: map,
              title: this.statname +  "\nAnomalies: " + found
            })
            //this.addMarker(this.lati, this.longi, this.statname +  "\nAnomalies: " + found);
            marker.addListener('click', function() {
              // do your thing
              // like make graph and shit
            });
          }
        }   
        this.loading = false;
      });
    })
  );
}// end initGoogleMap
  
  addMarker(lat: number, lng: number, name: string): void{
    new google.maps.Marker({map: this.map, title: name, position: {lat:lat, lng:lng}});
  }
}
