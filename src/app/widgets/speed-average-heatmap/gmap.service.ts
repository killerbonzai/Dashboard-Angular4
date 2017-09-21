import { GoogleMapsContainerService } from "../../services/googlemapscontainer/googlemapscontainer.service";
import { Injectable } from '@angular/core';

@Injectable()
export class GmapSAService {

  private map: google.maps.Map;
  private heatmap : google.maps.visualization.HeatmapLayer;

  private name: string;

  constructor(private googlemapscontainer: GoogleMapsContainerService) { }

  initMap(name: string, mapHtmlElement: HTMLElement, options: google.maps.MapOptions, data: google.maps.LatLng[]): Promise<google.maps.Map> {
    this.name = name;
    return this.googlemapscontainer.createMap(name, mapHtmlElement, options).then((map) => {
      this.map = map
      return this.map;
    });
  }

  addMarker(lat: number, lng: number, name: string): void{
      new google.maps.Marker({map: this.map, title: name, position: {lat:lat, lng:lng}});
  }
  addHeatmap(lat: number, lng: number, avgspeed: number, name: string){

    this.googlemapscontainer.getMap(this.name).then(() => {
      this.addMarker(lat, lng, name)
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: [
          new google.maps.LatLng(lat, lng)
        ],
        map: this.map
      });
      if(avgspeed > 55){
        this.heatmap.set('gradient', ['rgba(255, 0, 0, 0)',
        'rgba(255, 0, 0, 1)'])
      }else if(avgspeed < 45 && avgspeed > 1){
        this.heatmap.set('gradient', ['rgba(255, 255, 0, 0)',
        'rgba(255, 255, 0, 1)'])
      }else if(avgspeed <= 55 && avgspeed >= 45) {
        this.heatmap.set('gradient', ['rgba(0, 225, 0, 0)',
        'rgba(0, 255, 0, 1)'])
      }
      this.heatmap.set('radius',30);
      this.heatmap.set('opacity', 1);
      
      this.heatmap.setMap(this.map);  
    });
    
  }

  public delete(){
    this.googlemapscontainer.deleteMap(this.name);
  }
}