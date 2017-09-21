export class MenuElement {
    id: number;
    removeable: boolean;
    active: boolean
    titel: string;
  
    constructor(id: number, removeable: boolean, active: boolean, titel: string) {
      this.id = id;
      this.removeable = removeable;
      this.active = active;
      this.titel = titel;
    }
  }