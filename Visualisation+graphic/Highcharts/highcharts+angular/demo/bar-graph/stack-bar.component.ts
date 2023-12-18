import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighchartsChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: { text: 'Column chart with negative values' },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    series: [
      {
        type: 'bar',
        name: 'John',
        data: [5, 3, 0, 7, 2],
      },
      {
        name: 'Jane',
        type: 'bar',
        data: [2, -2, -3, 0, 1],
      },
      {
        type: 'bar',
        name: 'Joe',
        data: [0, 4, 4, -2, 5],
      },
    ],
  };

}
