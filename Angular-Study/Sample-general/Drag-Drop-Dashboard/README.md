[可拖放的面板- angular-gridster2+Angular material CDK的应用](top)

- [应用1- GridSter2+创建appLayoutItem Directive和ng-container](#应用1--gridster2创建applayoutitem-directive和ng-container)
  - [Project Structure](#project-structure)
  - [Gridster2 html结构](#gridster2-html结构)
  - [appLayoutItem Directive](#applayoutitem-directive)
  - [Gridster2的公共属性和方法- layout.service](#gridster2的公共属性和方法--layoutservice)
  - [面板组件- layout component](#面板组件--layout-component)
- [应用2 - GridSter2+ng-dynamic-component](#应用2---gridster2ng-dynamic-component)
  - [Project Structure](#project-structure-1)
  - [Drag and Drop Area](#drag-and-drop-area)
  - [Drag and Drop Event in SideNav](#drag-and-drop-event-in-sidenav)
- [应用3- Use Angular Material CDK](#应用3--use-angular-material-cdk)
  - [install](#install)
  - [Directive](#directive)
    - [cdkDrag Directive - drag function](#cdkdrag-directive---drag-function)
    - [cdkDragHandle Directive - drag using handle](#cdkdraghandle-directive---drag-using-handle)
    - [cdkDropListConnectedTo Directive - drag between lists](#cdkdroplistconnectedto-directive---drag-between-lists)
    - [cdkDropListData Directive - components](#cdkdroplistdata-directive---components)
  - [Sample](#sample)

## 应用1- GridSter2+创建appLayoutItem Directive和ng-container

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

## 应用2 - GridSter2+ng-dynamic-component

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

![interfaces](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Sample-general/Drag-Drop-Dashboard/interfaces.png)

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

## 应用3- Use Angular Material CDK

### install

- `ng add @angular/material`
- `npm install @angular/cdk`
- `import { DragDropModule } from '@angular/cdk/drag-drop';` in NgModule

### Directive

#### cdkDrag Directive - drag function

**Event Handler:** Add functions on cdkDrag to handle events

– `cdkDragStarted`: emits when user stops dragging.
– `cdkDragEnded`: emits when user starts dragging.
– `cdkDragMoved`: emits when user is dragging the item (for every pixel).

```html
<div cdkDrag class="drag-box" (cdkDragStarted)="dragStarted($event)" (cdkDragEnded)="dragEnded($event)" (cdkDragMoved)="dragMoved($event)">drag me</div>
<p>{{state}} {{position}}</p>
```

```javascript
import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
export class DragComponent implements OnInit {
  state = '';
  position = '';
  dragStarted(event: CdkDragStart) {
    this.state = 'dragStarted';
  }
  dragEnded(event: CdkDragEnd) {
    this.state = 'dragEnded';
  }
  dragMoved(event: CdkDragMove) {
    this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  }
}
```

#### cdkDragHandle Directive - drag using handle

- drag using a handle
- to restrict the draggable area by a handle element, just add `cdkDragHandle` directive to an element inside of `cdkDrag`

```html
<div class="drag-box-with-handler" cdkDrag>
  <div class="box-handler" cdkDragHandle>gkz</div>
</div>
```

#### cdkDropListConnectedTo Directive - drag between lists

  - helps to drag and drop of items between the multiple cdkDropList instances. The communication between two different cdkDropList established either by assigning the cdkDropList template variable to the cdkDropListConnectedTo directive or by assigning the cdkDropList Html element id value to cdkDropListConnectedTo directive
  - transfer data from one cdkDropList instance to another cdkDropList instance which means moving an item from one model object to another model object
  - Note: Drag & Drop between Lists
    - Connect one or more `cdkDropList` together using `cdkDropListConnectedTo` property. Then set `cdkDropListData` and `cdkDragData` for associating data with `cdkDropList` and `cdkDrag`
  - Implementation of `cdkDropListDropped` function will use drag-and-drop CDK `moveItemInArray` and `transferArrayItem`

#### cdkDropListData Directive - components

  - takes input like a component object that will render as Html Element items in cdkDropList instance. By assigning a component model object to cdkDropListData, makes our data to available in CDK drag and drop instance for sorting the data on each drag and drop of elements
- transferArrayItem method:
  - This method uses the component model data that was assigned to the cdkDropListData directive and then sort that data
  - By using the transferArrayItem method we can sort the data of both source and destination cdkDroList instances model objects

### Advance Sample

- work with Angular material component- Grid list
- cons: no delete function

```html
<div class="grid-container" style="overflow: hidden;">
    <mat-grid-list cols="8" rowHeight="1:1" gutterSize="15px">
        <mat-grid-tile *ngFor="let card of cards; let i = index;"
            [colspan]="card.cols"
            [rowspan]="card.rows">
            <cdk-drop-list [cdkDropListConnectedTo]="drops" [cdkDropListData]="i">
                <mat-card cdkDrag (cdkDragEntered)="entered($event)" [cdkDragData]="i" class="dashboard-card"
                    [style.backgroundColor]="card.color">
                    <mat-icon cdkDragHandle class="more-button">open_with</mat-icon>
                    <mat-card-content class="dashboard-card-content">
                        <h1>{{card.title}}</h1>
                    </mat-card-content>
                </mat-card>
            </cdk-drop-list>
        </mat-grid-tile>
    </mat-grid-list>
</div>
```

> Refences
- https://material.angular.io/cdk/drag-drop/overview
- https://stackblitz.com/edit/drag-drop-dashboard
- [Angular 7 Drag and Drop example – Angular Material CDK](https://grokonez.com/frontend/angular/angular-7/angular-7-drag-and-drop-example-angular-material-cdk)
- https://www.codegrepper.com/code-examples/html/how+to+implement+drag+and+drop+in+angular

[back to top](#top)

> References
- https://tiberiuzuld.github.io/angular-gridster2/
- [Drag and Drop dashboard builder with Angular and Gridster](https://medium.com/javascript-in-plain-english/drag-and-drop-dashboard-builder-with-angular-and-gridster-a07592e54ce2)
- https://github.com/chriskitson/ng-dashboard-builder
- [Dashboards and Dashboard Widgets - Part 1](https://robferguson.org/blog/2019/06/22/dashboards-and-dashboard-widgets-part-1/)
  - [repos](https://github.com/Robinyo/serendipity)
  - [demo](https://serendipity-f7626.firebaseapp.com/sales/dashboards)
- https://github.com/nathanagez/angular6-dynamic-dashboard
- https://github.com/gund/ng-dynamic-component
- [Angular 11 Chart Js Tutorial with ng2-charts Examples](https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/)
