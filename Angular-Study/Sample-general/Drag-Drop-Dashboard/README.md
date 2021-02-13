[可拖放的面板- angular-gridster2的应用](top)

- [应用1- 通过创建appLayoutItem Directive和ng-container](#应用1--通过创建applayoutitem-directive和ng-container)
  - [Project Structure](#project-structure)
  - [Gridster2 html结构](#gridster2-html结构)
  - [appLayoutItem Directive](#applayoutitem-directive)
  - [Gridster2的公共属性和方法- layout.service](#gridster2的公共属性和方法--layoutservice)
  - [面板组件- layout component](#面板组件--layout-component)
- [应用2 - Angular-GridSter2+ng-dynamic-component](#应用2---angular-gridster2ng-dynamic-component)
  - [Project Structure](#project-structure-1)
  - [Drag and Drop Area](#drag-and-drop-area)
  - [Drag and Drop Event in SideNav](#drag-and-drop-event-in-sidenav)
## 应用1- 通过创建appLayoutItem Directive和ng-container

### Project Structure

```
├── app/
│   ├── components/
│   │   ├── example1/                     - drag component1
│   │   ├── example2/                     - drag component2
│   │   └── layout/                       - drag area
│   ├── directives/
│   │   └── layout-item.directive.ts      -
│   ├── Services/
│   │   └── layout.servive.tc
```

### Gridster2 html结构

```html
<gridster [options]="options">
    <gridster-item *ngFor="let item of layout"
      [item]="item"
      (dragover)="layoutService.setDropId(item.id)">
        <ng-container appLayoutItem [componentRef]="layoutService.getComponentRef(item.id)"></ng-container>
        <button (click)="layoutService.deleteItem(item)"> Delete Item </button>
    </gridster-item>
</gridster>
```

### appLayoutItem Directive

```javascript
import { Example1Component } from '../components/example1/example1.component';
import { Example2Component } from '../components/example2/example2.component';
const components = {
    example1: Example1Component,
    example2: Example2Component
};
@Directive({
    selector: '[appLayoutItem]'
})
export class LayoutItemDirective implements OnChanges {
    @Input() componentRef: string;
    component: ComponentRef<any>;
    constructor(
        private container: ViewContainerRef,
        private resolver: ComponentFactoryResolver
    ) {}
    ngOnChanges(): void {
        const component = components[this.componentRef];
        if(component) {
            const factory = this.resolver.resolveComponentFactory<any>(component);
            this.component = this.container.createComponent(factory);
        }
    }
}
```

### Gridster2的公共属性和方法- layout.service

```javascript
export interface IComponent {
  id: string,
  componentRef: string
}
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    pushItems: true,
    resizable: {
      enabled: true
    }
  };
  public layout: GridsterItem[] = [];
  public components: IComponent[] = [];
  dropId: string;
  constructor() { }
  addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
      x: 0,
      y: 0
    });
  }
  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
    const comp = this.components.find(c => c.id === id);
    this.components.splice(this.components.indexOf(comp), 1);
  }
  setDropId(dropId: string): void {
    this.dropId = dropId;
  }
  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);
    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], components, { [updateIdx]: componentItem });
  }
  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }
}
```

### 面板组件- layout component

```javascript
export class LayoutComponent implements OnInit {
  get options(): GridsterConfig {
    return this.layoutService.options
  };
  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }
  get components(): IComponent[] {
    return this.layoutService.components;
  }
  constructor(
    public layoutService: LayoutService   //如设为private, 必须将dropItem，addItem，deleteItem，getComponentRef引入并设为local
  ) { }
  ngOnInit(): void { }
}
```

[back to top](#top)

## 应用2 - Angular-GridSter2+ng-dynamic-component

### Project Structure

```
├── app/
│   ├── components/
│   │   ├── bar-chart/                        - drag component
│   │   ├── ...                               - drag component
│   │   ├── sidenav/
│   │   └── dashboard/                        - drag area
│   ├── models/
│   │   └── dashboard-config.ts   - interface : Dashboard, DashboardItem, DashboardItemComponentInterface, ToolPaletteItem
                                  - enum : DisplayGrid, CompactType, GridType
│   ├── Services/
│   │   ├── dashboard/
│   │   └── sidenav/
│   ├── angular-material.module.ts
│   └── ...
├── assets/
│   ├── data/
│   │   ├── dashboard.json                 - initial dashboard config data
│   │   └── sidenav-items.json             -
│   ├── images/
│       └── icons/
```



### Drag and Drop Area

- dashboard.component
- use `<ndc-dynamic [ndcDynamicComponent]=components[item.component]></ndc-dynamic>` to loading component dynamicslly

```html
<gridster [options]="options" (drop)="onDrop($event)" style="background-color: transparent;">
  <ng-container *ngFor="let item of widgetsItem" style="overflow: hidden;">
    <gridster-item [item]="item" class="dashboard-widget">
      <mat-toolbar class="dashboard-widget-toolbar">
        <mat-toolbar-row class="dashboard-widget-toolbar-row">
          {{item.name}}
          <div>
            <button mat-button class="dashboard-widget-toolbar-button">
              <mat-icon class="drag-handler">open_with</mat-icon>
            </button>
            <button mat-button class="dashboard-widget-toolbar-button" (click)="onSettings(item)">
              <mat-icon>settings</mat-icon>
            </button>
            <button mat-button class="dashboard-widget-toolbar-button" (click)="onDelete(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </mat-toolbar-row>
      </mat-toolbar>
      <ndc-dynamic [ndcDynamicComponent]=components[item.component]></ndc-dynamic>
    </gridster-item>
  </ng-container>
</gridster>
```

```javascript
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {

  public options;
  public widgetsItems: DashboardItem[];
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
  }
}
```

### Drag and Drop Event in SideNav

```html
<mat-drawer-container class="example-container" autosize>
    <mat-drawer #drawer class="example-sidenav" position="end" mode="side">
        <mat-list style="padding: 10px;">
            <mat-card *ngFor="let item of toolPaletteItems"
                style="padding: 5px; margin-bottom: 10px; text-align: center;">
                <img mat-card-sm-image [src]="item.icon" [alt]="item.name" style="width: 40px; height: 40px;"
                    draggable="true"
                    (dragstart)="onDragStart($event, item.id)">
            </mat-card>
        </mat-list>
    </mat-drawer>
    <div class="example-sidenav-content">
        <button class="widget-icon" type="button" mat-button (click)="drawer.toggle()">
            <mat-icon>widgets</mat-icon>
            <!-- <span class="material-icons">widgets</span> -->
        </button>
        <dashboard></dashboard>
    </div>
</mat-drawer-container>
```

```javascript
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
```

[back to top](#top)

> References
- https://tiberiuzuld.github.io/angular-gridster2/
- [Drag and Drop dashboard builder with Angular and Gridster](https://medium.com/javascript-in-plain-english/drag-and-drop-dashboard-builder-with-angular-and-gridster-a07592e54ce2)
- https://github.com/chriskitson/ng-dashboard-builder
- [Dashboards and Dashboard Widgets - Part 1](https://robferguson.org/blog/2019/06/22/dashboards-and-dashboard-widgets-part-1/)
- https://github.com/Robinyo/serendipity
- https://github.com/nathanagez/angular6-dynamic-dashboard
- https://github.com/gund/ng-dynamic-component
- [Angular 11 Chart Js Tutorial with ng2-charts Examples](https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/)