import { Injectable } from '@angular/core';

@Injectable()
export class GooglechartsService {

  private googleChartsCallback: Function;

  private googleChartsIsLoadedPromise: Promise<void> = new Promise<void>((resolve: Function, reject: Function) => {
    this.googleChartsCallback = () => {resolve();}
  });

  constructor() {  
    google.charts.load('current', {});
    google.charts.setOnLoadCallback(this.googleChartsCallback);
  }

  public ChartsLoaded(): Promise<void> {
    return this.googleChartsIsLoadedPromise;
  }  
}