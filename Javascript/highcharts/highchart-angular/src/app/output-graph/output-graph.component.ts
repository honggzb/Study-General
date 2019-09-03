import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {

  public options: any = {
    chart: {
      type: 'scatter',
      height: 700
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + 'y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31').getTime(), 7]]
      }
    ]
  }

  subscription: Subscription;
  constructor(private http: HttpClient) { }

  ngOnInit(){
    //Highcharts.chart('container', this.options);
   // Set 10 seconds interval to update data again and again
   const source = interval(10000);

   // Sample API
   const apiLink = 'https://api.myjson.com/bins/13lnf4';

   this.subscription = source.subscribe(val => this.getApiResponse(apiLink).then(
     data => {
       const updated_normal_data = [];
       const updated_abnormal_data = [];
       data.forEach(row => {
         const temp_row = [
           new Date(row.timestamp).getTime(),
           row.value
         ];
         row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
       });
       this.options.series[0]['data'] = updated_normal_data;
       this.options.series[1]['data'] = updated_abnormal_data;
       Highcharts.chart('container', this.options);
     },
     error => {
       console.log('Something went wrong.');
     })
   );
 }

 getApiResponse(url) {
   return this.http.get<any>(url, {})
     .toPromise().then(res => {
       return res;
     });
 }
}
