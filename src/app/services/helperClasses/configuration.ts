import { Dashboard } from "./dashboard";

export class Configuration {
    dashboards: Dashboard[];
  
    constructor(dashboards: Dashboard[] = null) {
      if(dashboards == null){
        this.dashboards = [];
      }
      else{
        this.dashboards = dashboards;
      }   
    }
  }