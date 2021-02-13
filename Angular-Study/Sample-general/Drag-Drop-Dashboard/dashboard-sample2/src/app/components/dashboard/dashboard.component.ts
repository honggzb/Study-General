import { Component, SimpleChanges, ElementRef, Input, OnInit, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { DisplayGrid, GridType, DashboardItem, ToolPaletteItem } from '../../models/dashboard-config';

import { FunnelChartComponent } from '../funnel-chart/funnel-chart.component';
import { ParliamentChartComponent } from '../parliament-chart/parliament-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

import { DashboardWidgetService } from '../../services/dashboard/dashboard-widgt.service';
import { SidenavService } from '../../services/sidenav/side-nav.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
//import * as screenfull from 'screenfull';
//import { Screenfull } from 'screenfull';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {

  public options;
  public widgetsItems: DashboardItem[];
  //public screenFull = <Screenfull>screenfull;
  public toolPaletteItems: ToolPaletteItem[];
  protected subscription: Subscription;
  private canDrop = true;
  public components = {
    funnelChart: FunnelChartComponent,
    parliamentChart: ParliamentChartComponent,
    pieChart: PieChartComponent,
    timeline: TimelineComponent,
    lineChart: LineChartComponent,
    barChart: BarChartComponent
  };

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private commandBarSidenavService: SidenavService,
              private dashboardService: DashboardService,
              private dashboardWidgetService: DashboardWidgetService,
            ) {}

  public ngOnInit() {
    this.getOptions();
    this.getToolPaletteItems();
    this.subscribe();
  }

  public getOptions() {

    this.options = {
      disablePushOnDrag: true,
      displayGrid: DisplayGrid.Always,
      draggable: {
        enabled: true,
        ignoreContent: true,
        // dropOverItems: true,
        dropOverItems: false,
        dragHandleClass: 'drag-handler',
        ignoreContentClass: 'no-drag',
      },
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      emptyCellDropCallback: this.onDrop.bind(this),
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      gridType: GridType.Fit,
      itemResizeCallback: this.itemResize.bind(this),
      // maxCols: 6,
      // maxRows: 6,
      minCols: 10, // 6
      minRows: 10,  // 6
      pushDirections: { north: true, east: true, south: true, west: true },
      pushItems: true,
      resizable: { enabled: true }
      // swap: true,
    };

  }

  protected subscribe() {
    this.subscription = this.dashboardService.getDashboard().subscribe(data => {
      this.widgetsItems = data.widgets;
    });
  }

  public getToolPaletteItems() {
    const subscription: Subscription = this.dashboardService.getToolPaletteItems().subscribe(data => {
      this.toolPaletteItems = data;
      subscription.unsubscribe();
    });
  }

  public getToolPaletteItem(widgetId: string) {
    return this.toolPaletteItems.find(toolPaletteItem => toolPaletteItem.id === widgetId);
  }

  protected unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.unsubscribe();
    this.subscribe();
  }

  public onDragEnter(event) {
    // Deleting a widget (GridsterItem) leaves a gridster-preview behind
    // See: https://github.com/tiberiuzuld/angular-gridster2/issues/516
    //
    const gridsterPreviewElements = this.elementRef.nativeElement.getElementsByTagName('gridster-preview');
    // this.renderer.setStyle(gridsterPreview[0], 'display', 'block');
    this.renderer.setStyle(gridsterPreviewElements[0], 'background', 'rgba(0, 0, 0, .15)');
  }

  public onDrop(event) {
    // emptyCellDropCallback is called twice
    // See: https://github.com/tiberiuzuld/angular-gridster2/issues/513
    //
    if (this.canDrop) {
      this.canDrop = false;
      const widgetId = event.dataTransfer.getData('widgetIdentifier');
      const toolPaletteItem = this.getToolPaletteItem(widgetId);
      const widget = { cols: 4, rows: 4, y: 0, x: 0, ...toolPaletteItem };
      this.widgetsItems.push(widget);
      setTimeout(() => {
        this.canDrop = true;
      }, 1000);
    }
  }

  public itemResize(item: DashboardItem): void {
    //this.dashboardWidgetService.reflowWidgets();
  }

  public itemChange() {

  }

  public ngOnDestroy() {
    if (this.commandBarSidenavService.isOpen()) {
      this.commandBarSidenavService.toggle();
    }
    this.unsubscribe();
  }

  //
  // Toolbar events
  //

  public onDelete(item) {
    this.widgetsItems.splice(this.widgetsItems.indexOf(item), 1);
    //
    // Deleting a widget (GridsterItem) leaves a gridster-preview behind
    // See: https://github.com/tiberiuzuld/angular-gridster2/issues/516
    //
    const gridsterPreviewElements = this.elementRef.nativeElement.getElementsByTagName('gridster-preview');
    // this.renderer.setStyle(gridsterPreview[0], 'display', 'none !important');
    this.renderer.setStyle(gridsterPreviewElements[0], 'background', '#fafafa');
  }

  public onSettings(item) {
    // this.dialogService.openAlert({
    //   title: 'Alert',
    //   message: 'You clicked the Settings button.',
    //   closeButton: 'CLOSE'
    // });
  }

}
