import { Injectable } from '@angular/core';

const DATA = [
{ "_id" : "59897c6de640cd3c267307e9", "siteid" : 4205461, "vehicleid": 4293636885, "datetime" : "2017-05-01 15:00:01", "lane" : 1, "speed" : 71, "length" : 52, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307eb", "siteid" : 4205461, "vehicleid": 4293636889, "datetime" : "2017-05-01 15:00:17", "lane" : 2, "speed" : 68, "length" : 50, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307ec", "siteid" : 4205461, "vehicleid": 4293636887, "datetime" : "2017-05-01 15:00:11", "lane" : 1, "speed" : 67, "length" : 46, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307ea", "siteid" : 4205461, "vehicleid": 4293636888, "datetime" : "2017-05-01 15:00:12", "lane" : 2, "speed" : 60, "length" : 48, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307ed", "siteid" : 4205461, "vehicleid": 4293636890, "datetime" : "2017-05-01 15:00:19", "lane" : 2, "speed" : 71, "length" : 47, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307ee", "siteid" : 4205461, "vehicleid": 4293636893, "datetime" : "2017-05-01 15:00:29", "lane" : 2, "speed" : 53, "length" : 46, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307ef", "siteid" : 4205461, "vehicleid": 4293636894, "datetime" : "2017-05-01 15:00:32", "lane" : 2, "speed" : 56, "length" : 44, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f0", "siteid" : 4205461, "vehicleid": 4293636892, "datetime" : "2017-05-01 15:00:28", "lane" : 2, "speed" : 54, "length" : 45, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f1", "siteid" : 4205461, "vehicleid": 4293636895, "datetime" : "2017-05-01 15:00:34", "lane" : 2, "speed" : 55, "length" : 49, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f2", "siteid" : 4205461, "vehicleid": 4293636896, "datetime" : "2017-05-01 15:00:41", "lane" : 2, "speed" : 74, "length" : 39, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f3", "siteid" : 4205461, "vehicleid": 4293636897, "datetime" : "2017-05-01 15:00:43", "lane" : 1, "speed" : 61, "length" : 50, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f4", "siteid" : 4205461, "vehicleid": 4293636898, "datetime" : "2017-05-01 15:00:44", "lane" : 1, "speed" : 62, "length" : 39, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f5", "siteid" : 4205461, "vehicleid": 4293636900, "datetime" : "2017-05-01 15:00:55", "lane" : 2, "speed" : 62, "length" : 47, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f6", "siteid" : 4205461, "vehicleid": 4293636899, "datetime" : "2017-05-01 15:00:47", "lane" : 2, "speed" : 62, "length" : 41, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f7", "siteid" : 4205461, "vehicleid": 4293636901, "datetime" : "2017-05-01 15:01:02", "lane" : 2, "speed" : 54, "length" : 46, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c267307f8", "siteid" : 4205461, "vehicleid": 4293636902, "datetime" : "2017-05-01 15:01:04", "lane" : 2, "speed" : 54, "length" : 46, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307f9", "siteid" : 4205461, "vehicleid": 4293636903, "datetime" : "2017-05-01 15:01:06", "lane" : 2, "speed" : 54, "length" : 60, "class" : 4, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307fa", "siteid" : 4205461, "vehicleid": 4293636904, "datetime" : "2017-05-01 15:01:08", "lane" : 2, "speed" : 57, "length" : 76, "class" : 4, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307fb", "siteid" : 4205461, "vehicleid": 4293636905, "datetime" : "2017-05-01 15:01:17", "lane" : 1, "speed" : 72, "length" : 39, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307fc", "siteid" : 4205461, "vehicleid": 4293636891, "datetime" : "2017-05-01 15:00:20", "lane" : 1, "speed" : 71, "length" : 42, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307fd", "siteid" : 4205461, "vehicleid": 4293636908, "datetime" : "2017-05-01 15:01:30", "lane" : 1, "speed" : 62, "length" : 45, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307fe", "siteid" : 4205461, "vehicleid": 4293636907, "datetime" : "2017-05-01 15:01:26", "lane" : 1, "speed" : 68, "length" : 176, "class" : 9, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c267307ff", "siteid" : 4205461, "vehicleid": 4293636909, "datetime" : "2017-05-01 15:01:37", "lane" : 1, "speed" : 58, "length" : 48, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c26730800", "siteid" : 4205461, "vehicleid": 4293636910, "datetime" : "2017-05-01 15:01:38", "lane" : 1, "speed" : 57, "length" : 9, "class" : 1, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c26730801", "siteid" : 4205461, "vehicleid": 4293636911, "datetime" : "2017-05-01 15:01:41", "lane" : 1, "speed" : 53, "length" : 40, "class" : 2, "wrong_dir" : 1 },
{ "_id" : "59897c6de640cd3c26730802", "siteid" : 4205461, "vehicleid": 4293636913, "datetime" : "2017-05-01 15:01:43", "lane" : 1, "speed" : 56, "length" : 44, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730803", "siteid" : 4205461, "vehicleid": 4293636912, "datetime" : "2017-05-01 15:01:42", "lane" : 2, "speed" : 68, "length" : 37, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730804", "siteid" : 4205461, "vehicleid": 4293636906, "datetime" : "2017-05-01 15:01:19", "lane" : 1, "speed" : 72, "length" : 46, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730805", "siteid" : 4205461, "vehicleid": 4293636915, "datetime" : "2017-05-01 15:01:47", "lane" : 1, "speed" : 56, "length" : 44, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730806", "siteid" : 4205461, "vehicleid": 4293636916, "datetime" : "2017-05-01 15:01:48", "lane" : 2, "speed" : 62, "length" : 51, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730807", "siteid" : 4205461, "vehicleid": 4293636917, "datetime" : "2017-05-01 15:01:52", "lane" : 2, "speed" : 58, "length" : 41, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730808", "siteid" : 4205461, "vehicleid": 4293636918, "datetime" : "2017-05-01 15:01:54", "lane" : 2, "speed" : 57, "length" : 47, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730809", "siteid" : 4205461, "vehicleid": 4293636914, "datetime" : "2017-05-01 15:01:45", "lane" : 1, "speed" : 58, "length" : 38, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080a", "siteid" : 4205461, "vehicleid": 4293636920, "datetime" : "2017-05-01 15:01:56", "lane" : 2, "speed" : 57, "length" : 75, "class" : 4, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080b", "siteid" : 4205461, "vehicleid": 4293636919, "datetime" : "2017-05-01 15:01:55", "lane" : 1, "speed" : 73, "length" : 53, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080c", "siteid" : 4205461, "vehicleid": 4293636921, "datetime" : "2017-05-01 15:01:58", "lane" : 2, "speed" : 53, "length" : 93, "class" : 6, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080d", "siteid" : 4205461, "vehicleid": 4293636923, "datetime" : "2017-05-01 15:02:18", "lane" : 1, "speed" : 63, "length" : 44, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080e", "siteid" : 4205461, "vehicleid": 4293636924, "datetime" : "2017-05-01 15:02:20", "lane" : 1, "speed" : 70, "length" : 48, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c2673080f", "siteid" : 4205461, "vehicleid": 4293636925, "datetime" : "2017-05-01 15:02:24", "lane" : 1, "speed" : 56, "length" : 40, "class" : 2, "wrong_dir" : 0 },
{ "_id" : "59897c6de640cd3c26730810", "siteid" : 4205461, "vehicleid": 4293636926, "datetime" : "2017-05-01 15:02:29", "lane" : 1, "speed" : 67, "length" : 47, "class" : 2, "wrong_dir" : 0 }]

@Injectable()
export class MeasurementService{
    measurements: any[];

    constructor(){    
        this.measurements = DATA;
        console.log(this.measurements.length);
    }

    getMeasurements(): any[]{
        console.log(this.measurements.length);
        return this.measurements;
    }
}