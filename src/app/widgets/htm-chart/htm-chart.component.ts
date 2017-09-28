import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlecharts/googlecharts.service';
import { Http, Response } from '@angular/http';

import * as $ from 'jquery';
declare var swal: any;

@Component({
  selector: '[app-htm-chart]',
  templateUrl: './htm-chart.component.html',
  styleUrls: ['./htm-chart.component.css']
})

export class HtmChartComponent implements OnInit, WidgetComponent {
  @Input("12") id: number;
  @Input("Anomaly detection") title: string;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  station: string;

  datepickerOpts = {
    autoclose: true,
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'd MM yyyy',
    icon: 'fa fa-calendar'
  }

  //spinner
  public loading = false;

  private apiUrl: string;
  data: any[];


  // all stations
  private apiUrlStations: string = "http://adm-trafik-01.odknet.dk:2004/api/GetAllStations/Stations";
  dataStations: any[];
  selectedItem: string;
  areacode: number;

  datatablearray: any[];

  constructor(private googlechartservice: GooglechartsService, private http: Http) {
    this.getAllStations();
  }

  ngOnInit() {
    // this.loadExperiment();   
  }


  buttonClick() {
      this.getSelectedStation();
      this.apiUrl = `http://adm-trafik-01.odknet.dk:2011/api/Anomaly/GetAnomalies?from=${this.dateFrom.toISOString()}&to=${this.dateTo.toISOString()}&areacode=${this.areacode}`;
      this.LoadCharts();

  }

  LoadCharts() {
    this.loading = true;
    this.googlechartservice.ChartsLoaded().then(() => {
      this.getSelectedStation();
      this.datatablearray = new Array();
      this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(data => {
        this.data = data;
        if(this.data.length < 1){
          swal ( "Ingen data fundet" ,  "Vælg andet tidspunkt" ,  "error" )
          this.loading = false;
        }else{
          this.data.forEach(element => {
            this.datatablearray.push([new Date(element.date), element.anomaly_likelihood, this.getTooltipText(element.value, element.anomaly_score, element.anomaly_likelihood)]);
          });
          this.datatablearray.unshift(['Date', 'Anomaly Likelihood', { type: 'string', role: 'tooltip' }]);
          this.drawChart();
        }   
        this.loading = false;
      });
    });
  }

  private getTooltipText(value, score, likelihood): String {
    return `Speed: ${value}\nScore: ${score}\nLikelihood: ${likelihood}`;
  }

  private drawChart() {
    var wrapper = new google.visualization.ChartWrapper({
      chartType: 'LineChart',
      dataTable: google.visualization.arrayToDataTable(this.datatablearray),
      options: { 'title': 'AnomalyDetection' },
      containerId: 'htm-chart',

    });
    wrapper.draw();
  }
  /*
    loadExperiment2(){
  
      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Year');
      dataTable.addColumn('number', 'Sales');
      // A column for custom tooltip content
      dataTable.addColumn({type: 'string', role: 'tooltip'});
      dataTable.addRows([
        ['2010', 600,'$600K in our first year!'],
        ['2011', 1500, 'Sunspot activity made this our best year ever!'],
        ['2012', 800, '$800K in 2012.'],
        ['2013', 1000, '$1M in sales last year.']
      ]);
  
      var options = {
        tooltip: {isHtml: true},
        legend: 'none'
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('col_chart_html_tooltip'));
      chart.draw(dataTable, Option);
  
    }
  
  
    loadGoogleChart(){
     
      this.googlechartservice.ChartsLoaded().then(() => {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Year');
        dataTable.addColumn('number', 'Sales');
        
  
        var wrapper = new google.visualization.ChartWrapper({
          chartType: 'LineChart',
          dataTable: [
            ['Year', 'Anomaly Score', 'Anomaly Likelyhood','tooltip'],
            ['2004',  0.014, 0.018,0.45],
            ['2005',  1, 1,0.34],
            ['2006',  0.3, 0.8,0.65],
            ['2007',  0.5,  0.6,0.65]
          ],
          options: {'title': 'Countries'},
          containerId: 'htm-chart',
          
        });
        wrapper.draw();
      });
    }*/

  getAllStations() {
    this.http.get(this.apiUrlStations).map((res: Response) => res.json()).subscribe(data => {
      this.dataStations = data;
    })
  }

  getSelectedStation() {

    this.dataStations.forEach(station => {
      if (station.name == this.selectedItem) {
        this.selectedItem = station.name;
        this.areacode = station.areacode;
      }
    });

  }
}
