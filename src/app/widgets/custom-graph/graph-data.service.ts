import { Injectable } from '@angular/core';

@Injectable()
export class GraphDataService{
    
    private dataOptions: DataPoint[];

    constructor(){
        this.dataOptions = new Array<DataPoint>();
        this.dataOptions.push(new DataPoint("Tid", DataType.Date));
        this.dataOptions.push(new DataPoint("VehicleId", DataType.Integer));
        this.dataOptions.push(new DataPoint("Bane", DataType.Integer));
        this.dataOptions.push(new DataPoint("Hastighed", DataType.Integer));
        this.dataOptions.push(new DataPoint("Længde", DataType.Integer));
        this.dataOptions.push(new DataPoint("Biltype", DataType.Integer));
        this.dataOptions.push(new DataPoint("Gap", DataType.Integer));
        this.dataOptions.push(new DataPoint("WrongDir", DataType.Integer));
        this.dataOptions.push(new DataPoint("Display", DataType.Integer));
        this.dataOptions.push(new DataPoint("Flash", DataType.Integer));
        this.dataOptions.push(new DataPoint("StationsId", DataType.Integer));
    }

    public getDataPoints(): DataPoint[] {
        return this.dataOptions;
    }
}

export class DataPoint{

    public dataProperty: string;
    public dataType: DataType;

    constructor(dataProperty: string, dataType: DataType){
        this.dataProperty = dataProperty;
        this.dataType = dataType;
    }

}

export enum DataType{
    String,
    Integer,
    Boolean,
    Double,
    Array,
    TimeStamp,
    Object,
    Null,
    Date
}