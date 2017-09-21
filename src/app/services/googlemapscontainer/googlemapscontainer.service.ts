import { Injectable, Component } from '@angular/core';

@Injectable()
export class GoogleMapsContainerService {

  private maps: Map<string, google.maps.Map>;
  private googleMapsScriptLoaded: boolean;

  private scriptLoadedPromise: Promise<void>;

  constructor() {
    this.maps = new Map<string, google.maps.Map>();
    this.googleMapsScriptLoaded = false;
  }

  public createMap(name: string, htmlelement: HTMLElement, mapOptions: google.maps.MapOptions): Promise<google.maps.Map> {
    if(!this.googleMapsScriptLoaded)
      this.addGoogleMapsScript();
    return this.scriptLoaded().then(() => {
      this.maps.set(name, new google.maps.Map(htmlelement, mapOptions));
      console.log(this.maps);
      return this.getMap(name);
    });
  }

  public deleteMap(name: string): boolean{
    let b = this.maps.delete(name);
    console.log(this.maps);
    return b;
  }

  public getMap(name: string): Promise<google.maps.Map> {
    return this.scriptLoaded().then(() => {
      return this.maps.get(name);
    });
  }

  private addGoogleMapsScript(){
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAqg1BzcJOAGeLAIbA5tgrHBWtrfc6Rx5U&callback=googleMapsLoaded&libraries=drawing,geometry,places,visualization';
    this.scriptLoadedPromise = new Promise<void>((resolve: Function, reject: Function) => {
      window['googleMapsLoaded'] = () => { this.googleMapsScriptLoaded = true; resolve(); };

      script.onerror = (error: Event) => { reject(error); }
    });
    document.body.appendChild(script);
  }

  private scriptLoaded (): Promise<void> {
    return this.scriptLoadedPromise;
  }
}
