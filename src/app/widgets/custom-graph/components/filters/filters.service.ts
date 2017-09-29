import { Injectable } from '@angular/core';

@Injectable()
export class FiltersService {

  lanes: Number[] = [];
  display: Boolean = false;
  flash: Boolean = false;
  wrongdir: Boolean = false;

  constructor() {

  }

  updateLanes(){
    let el = document.getElementById('lanes') as HTMLSelectElement;
    let options = el.selectedOptions;
    this.lanes = [];
    for (let i = 0; i<options.length; i++)
    {
      this.lanes.push(Number.parseInt(options[i].value));
    }
    console.log(this.lanes);
  }

}
