import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetComponent } from '../../services/widgetLibrary-service/widget.component';
import { GooglechartsService } from '../../services/googlecharts/googlecharts.service';

@Component({
  selector: 'app-custom-graph',
  templateUrl: './custom-graph.component.html',
  styleUrls: ['./custom-graph.component.css']
})
export class CustomGraphComponent implements OnInit, WidgetComponent {
  @Input("7") id: number;
  @Input("Lav din egen graf") title: string;

  @ViewChild("chart") el: ElementRef;

  constructor(private chartService: GooglechartsService) {

  }

  ngOnInit() {
    this.chartService.ChartsLoaded().then(() => {
      let wrapper = new google.visualization.ChartWrapper({ chartType: "PieChart" });
      wrapper.setDataTable(google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ]));

      wrapper.setOptions({
        title: 'My Daily Activities'
      });


      wrapper.draw(this.el.nativeElement);
    });

  }

}
