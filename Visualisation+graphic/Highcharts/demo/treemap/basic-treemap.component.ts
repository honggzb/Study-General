import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from  'highcharts-angular';
import highchartsTreemap from 'highcharts/modules/treemap';
highchartsTreemap(Highcharts);
 
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

  data = [
    {
      name: 'A',
      value: 6,
      colorValue: 1,
    },
    {
      name: 'B',
      value: 6,
      colorValue: 2,
    },
    {
      name: 'C',
      value: 4,
      colorValue: 3,
    },
    {
      name: 'D',
      value: 3,
      colorValue: 4,
    },
    {
      name: 'E',
      value: 2,
      colorValue: 5,
    },
    {
      name: 'F',
      value: 2,
      colorValue: 6,
    },
    {
      name: 'G',
      value: 1,
      colorValue: 7,
    },
  ];

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'treemap',
        data: this.data,
      },
    ],
    title: {
      text: 'Highcharts Treemap',
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: '#AAAFFF',
    },
  };
}
