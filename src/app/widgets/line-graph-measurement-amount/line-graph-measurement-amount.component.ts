import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlecharts/googlecharts.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: '[app-line-graph-measurement-amount]',
  templateUrl: './line-graph-measurement-amount.component.html',
  styleUrls: ['./line-graph-measurement-amount.component.css']
})
export class LineGraphMeasurementAmountComponent implements WidgetComponent, OnInit {
  @Input("11") id: number;
  @Input("Graf over målinger") title: string;

  // Anderupvej: 46102360 -- Falen: 46171141
  private apiUrlFalen: string;
  dataFalen: any[];

  private apiUrlAndrup: string;
  dataAndrup: any[];

  graphDataTable: any[];

  constructor(private googlechartservice: GooglechartsService, private http: Http) { 
  }

  ngOnInit() {
    this.FillDataTable();
  }

  ngOnDestroy() {
    this.FillDataTable();
  }

  private FillDataTable() {
    this.googlechartservice.ChartsLoaded().then(() => {
    
      var datatable = new google.visualization.DataTable();

      datatable.addColumn('timeofday', 'tidspunkt');
      datatable.addColumn('number', 'Falen');
      datatable.addColumn('number', 'Andrup');

        datatable.addRows([
          [[1,0,0], 0, 0], [[2,0,0], 10, 15],   [[3,0,0], 23, 15],  [[4,0,0], 17, 9],   [[5,0,0], 18, 10],  [[6,0,0], 9, 5],
          [[7,0,0], 11, 3],  [[8,0,0], 27, 19],  [[9,0,0], 33, 25],  [[10,0,0], 40, 32],  [[11,0,0], 32, 24], [[12,0,0], 35, 27],
          [[13,0,0], 30, 22], [[14,0,0], 40, 32], [[15,0,0], 42, 34], [[16,0,0], 47, 39], [[17,0,0], 44, 36], [[18,0,0], 48, 40],
          [[19,0,0], 52, 44], [[20,0,0], 54, 70], [[21,0,0], 42, 34], [[22,0,0], 55, 47], [[23,0,0], 56, 48], [[24,0,0], 57, 49],
        ]);

        var wrapper = new google.visualization.ChartWrapper({
          chartType: 'LineChart',
          dataTable: datatable,
          options: {
            'title': 'Målinger',
            'height' : '400',
            'hAxis': { title: 'Tidspunkt' },
            'vAxis': { title: 'Antal biler' }
          },
          containerId: 'chart_id',
        });
        wrapper.draw();

    });
  }
}
