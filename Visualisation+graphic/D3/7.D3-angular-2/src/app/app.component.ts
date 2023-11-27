import { Component, OnInit } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // force-directed graph dataset initial
  nodes: Node[] = [];
  links: Link[] = [];
  
  constructor() {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;
  
    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }
  
    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;
  
        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }
  
  //bar Graph dataset initial
  private chartData: Array<any>;
  ngOnInit() {
   setTimeout(() => {       // give everything a chance to get loaded before starting the animation to reduce choppiness
      this.generateData();	
      setInterval(() => this.generateData(), 3000);
    }, 1000);	  
   }	
   
  generateData() {	    
     this.chartData = [];	    
     for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
