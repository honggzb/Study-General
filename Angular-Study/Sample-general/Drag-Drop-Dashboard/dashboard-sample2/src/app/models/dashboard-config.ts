import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';

// https://google.github.io/styleguide/jsoncstyleguide.xml

// https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterConfig.interface.ts

export enum DisplayGrid {
  Always = 'always',
  OnDragAndResize = 'onDrag&Resize',
  None = 'none'
}

export enum CompactType {
  None = 'none',
  CompactUp = 'compactUp',
  CompactLeft = 'compactLeft',
  CompactUpAndLeft = 'compactUp&Left',
  CompactLeftAndUp = 'compactLeft&Up',
  CompactRight = 'compactRight',
  CompactUpAndRight = 'compactUp&Right',
  CompactRightAndUp = 'compactRight&Up',
}

export enum GridType {
  Fit = 'fit',
  ScrollVertical = 'scrollVertical',
  ScrollHorizontal = 'scrollHorizontal',
  Fixed = 'fixed',
  VerticalFixed = 'verticalFixed',
  HorizontalFixed = 'horizontalFixed'
}

// https://github.com/tiberiuzuld/angular-gridster2/blob/v7.2.0/projects/angular-gridster2/src/lib/gridsterItem.interface.ts

export interface DashboardItem extends GridsterItem {
  id?: string;
  name?: string;
  component?: any;
  // icon?: string;
}

export interface Dashboard {
  id?: string;
  name?: string;
  widgets?: Array<DashboardItem>;
}

export interface ToolPaletteItem {
  id?: string;
  name?: string;
  component?: any;
  icon?: string;
}
