import { GoogleMapsContainerService } from '../../services/googlemapscontainer/googlemapscontainer.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GmapSAASService {

  private map: google.maps.Map;
  private heatmaps : google.maps.visualization.HeatmapLayer[];
  private red : number
  private green : number

  private name: string;
  
  constructor(private googlempscontainer: GoogleMapsContainerService){}

  initMap(name: string, mapHtmlElement: HTMLElement, options: google.maps.MapOptions, data: google.maps.LatLng[]): Promise<google.maps.Map> {
    return this.googlempscontainer.createMap(name, mapHtmlElement, options).then((map) => {
      this.map = map;
      this.name = name;
      this.heatmaps = [];
      return this.map;      
    });
  }

  addMarker(lat: number, lng: number, name: string): void{
      new google.maps.Marker({map: this.map, title: name, position: {lat:lat, lng:lng}});
  }

  data: any[] = []

  addHeatmap(any: any[], red: number, green: number){
    return this.googlempscontainer.getMap(this.name).then(() => {
      this.data = []
      //this.addMarker(lat, lng, name)
      Array.from(any).forEach((marker,i) => {
        this.data.push(new google.maps.LatLng(marker['latitude'],marker['longitude']))
      });
      let l = this.heatmaps.push(new google.maps.visualization.HeatmapLayer({
        data: this.data,
        map: this.map
      }));
      this.heatmaps[l-1].set('gradient', ['rgba('+red.valueOf()+','+green.valueOf()+', 0, 0)',
      'rgba('+red.valueOf()+','+green.valueOf()+', 0, 1)'])

      this.heatmaps[l-1].set('radius',10);
      this.heatmaps[l-1].set('opacity', 1);
      
      this.heatmaps[l-1].setMap(this.map);  
    });
    
  }

  public clearHeatmaps(){
    if(this.heatmaps){
      this.heatmaps.forEach((hmap) => {
        hmap.setMap(null);
      }); 
      this.heatmaps = [];
    }
  }

  public delete() {
    this.googlempscontainer.deleteMap(this.name);
  }
}