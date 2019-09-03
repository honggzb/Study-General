import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {OutputGraphComponent} from './output-graph/output-graph.component';
import {OutputGraph2Component} from './output-graph2/output-graph2.component';

const routes: Routes =[
  { path: '', component: OutputGraphComponent },
  { path: 'graph1', component: OutputGraphComponent },
  { path: 'graph2', component: OutputGraph2Component },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
