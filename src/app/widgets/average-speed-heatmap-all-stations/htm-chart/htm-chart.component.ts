import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlechart/googlechart.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: '[app-htm-chart]',
  templateUrl: './htm-chart.component.html',
  styleUrls: ['./htm-chart.component.css']
})
export class HtmChartComponent implements OnInit, WidgetComponent {
  @Input("9") id: number;
  @Input("Anomaly detection") title: string;


    dateFrom: Date = new Date();
  dateTo: Date = new Date();
  station: string;

  datepickerOpts = {
    autoclose: true,
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'd MM yyyy',
    icon : 'fa fa-calendar'
  }

  //spinner
  showContentBool:boolean = false;
  public loading = false;

  // car types 
  private apiUrl: string;
  data: any[];
  carTypeName: string;

  // all stations
  private apiUrlStations: string = "http://adm-trafik-01.odknet.dk:2004/api/GetAllStations/Stations";
  dataStations: any[];
  selectedItem: string;
  areacode: number;



  constructor(private googlechartservice: GooglechartsService, private http: Http) {
    this.getAllStations();
  }

  getApiData() {
    this.getSelectedStation();
    

  }



  ngOnInit() {
    this.googlechartservice.ChartsLoaded().then(() => {
      var wrapper = new google.visualization.ChartWrapper({
        chartType: 'LineChart',
        /*'chartType':'LineChart',
        'dataSourceUrl':'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1',
        'query':'SELECT A,D WHERE D > 100 ORDER BY D',
        'options': {'title':'Population Density (people/km^2)', 'legend':'none'}
*/

        
        dataTable: [
          ['Year', 'Anomaly Score', 'Anomaly Likelyhood'],
          ['2004',  0.014, 0.018],
          ['2005',  1, 1],
          ['2006',  0.3, 0.8],
          ['2007',  0.5,  0.6]
        ],
        options: {'title': 'Countries'},
        containerId: 'htm-chart'
        
      });
      wrapper.draw();
    });
    
  }

  loadGoogleChart(){

    
  }

  getAllStations() {
    this.http.get(this.apiUrlStations).map((res: Response) => res.json()).subscribe(data => {
      this.dataStations = data;
    })
  }

  getSelectedStation() {
    
        this.dataStations.forEach(station => {
          if (station.name == this.selectedItem ) {
            this.selectedItem = station.name;
            this.areacode = station.areacode;
          }
        });

}}
