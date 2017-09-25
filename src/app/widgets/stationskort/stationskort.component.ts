import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GoogleMapsContainerService } from "../../services/googlemapscontainer/googlemapscontainer.service";
import { Http, Response } from '@angular/http';

//used to map jsonstring to a collection of data
import 'rxjs/add/operator/map';

@Component({
  selector: '[app-stationskort]',
  templateUrl: './stationskort.component.html',
  styleUrls: ['./stationskort.component.css']
})
export class StationskortComponent implements WidgetComponent, OnInit, OnDestroy {
  @Input("2") id: number;
  @Input("Stationskort") title: string;
  @ViewChild('map') mapRef: ElementRef;

  private apiUrl = "http://adm-trafik-01.odknet.dk:2002/api/GetAllStations/Stations";
  data: any = [];
  map: google.maps.Map;

  constructor(private gmapService: GoogleMapsContainerService, private http: Http) {
    this.getData();
    this.getAllStations();
  }

  ngOnInit() {
    this.initGoogleMap();
  } // end ngOnInit

  ngOnDestroy() {
    this.gmapService.deleteMap(this.title);
  }

  getData() {
    // see import comment
    return this.http.get(this.apiUrl).map((res: Response) => res.json())
  }

  getAllStations() {
    this.getData().subscribe(data => {
      this.data = data;
    })
  }

  initGoogleMap() {
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
      this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(response => {
        if(response){
          for (var i in response) {
            if (response.hasOwnProperty(i)) {
              var marker = response[i];
              this.addMarker(Number(marker.latitude), Number(marker.longitude), marker.name + "\nUdsty: " + marker.equipmentType + "\nInstalleret: " + marker.installed);
            }
          }
        }
      })
    }));
    
  }// end initGoogleMap
  
  addMarker(lat: number, lng: number, name: string): void{
    new google.maps.Marker({map: this.map, title: name, position: {lat:lat, lng:lng}});
}
}
