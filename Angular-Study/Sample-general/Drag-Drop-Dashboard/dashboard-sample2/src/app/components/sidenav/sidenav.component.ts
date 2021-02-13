import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SidenavService } from '../../services/sidenav/side-nav.service';

import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToolPaletteItem } from '../../models/dashboard-config';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public toolPaletteItems: ToolPaletteItem[];
  protected subscription: Subscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.subscribe();
  }

  protected subscribe() {
    this.subscription = this.dashboardService.getToolPaletteItems().subscribe(data => {
      this.toolPaletteItems = data;
    });
  }

  public onDragStart(event, identifier) {
    event.dataTransfer.setData('widgetIdentifier', identifier);
    event.dataTransfer.setData('text/plain', 'Drag Me Button');
    event.dataTransfer.dropEffect = 'move';
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
