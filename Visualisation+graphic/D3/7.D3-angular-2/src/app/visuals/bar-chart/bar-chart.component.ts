import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="d3-chart" #chart>
      <svg #barSvg>
        <g [zoomableOf]="barSvg"></g>
      </svg>
    </div>`,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  
  @ViewChild('chart') private chartContainer: ElementRef;
  @ViewChild('barSvg') private barContainer: ElementRef;
  @Input() private data: Array<any>;
  
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  
  constructor() { }

  ngOnInit() {
    this.createChart();	    
    if (this.data) {	      
      this.updateChart();	    
    }
  }
  
  ngOnChanges() {
    if (this.chart) {	      
      this.updateChart();	    
    }
  }

  createChart(){
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(this.barContainer.nativeElement)
                  .attr('width', element.offsetWidth)
                  .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.select('g')
                    .attr('class', 'bars')
                    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis =  this.chart.append('g')
                      .attr('class', 'axis axis-x')
                      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
                      .call(d3.axisBottom(this.xScale));
    this.yAxis =  this.chart.append('g')
                      .attr('class', 'axis axis-y')
                      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
    this.chart.selectAll("rect")
              .data(this.data)
              .enter()
              .append('rect')
              .attr('class', 'bar')
              .attr('x', d => this.xScale(d[0]))
              .attr('y', d => this.yScale(0))
              .attr('width', this.xScale.bandwidth())
              .attr('height', 0)
              .style('fill', (d, i) => this.colors(i))
              .transition()
              .duration(1000)
              .delay((d, i) => i * 10)
              .attr('y', d => this.yScale(d[1]))
              .attr('height', d => this.height - this.yScale(d[1]));
  }
  
  updateChart(){
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar').data(this.data);
    // remove exiting bars
    update.exit().remove();
    // update existing bars
    this.chart.selectAll('.bar').transition()
              .attr('x', d => this.xScale(d[0]))
              .attr('y', d => this.yScale(d[1]))
              .attr('width', d => this.xScale.bandwidth())
              .attr('height', d => this.height - this.yScale(d[1]))
              .style('fill', (d, i) => this.colors(i));
    // add new bars
    update.enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => this.xScale(d[0]))
          .attr('y', d => this.yScale(0))
          .attr('width', this.xScale.bandwidth())
          .attr('height', 0)
          .style('fill', (d, i) => this.colors(i))
          .transition()
          .duration(1000)
          .delay((d, i) => i * 10)
          .attr('y', d => this.yScale(d[1]))
          .attr('height', d => this.height - this.yScale(d[1]
  }
}
