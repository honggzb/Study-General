import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dashboard, ToolPaletteItem } from '../../models/dashboard-config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DASHBOARD = 'assets/data/dashboard.json';
  private readonly SIDENAV_ITEMS = 'assets/data/sidenav-items.json';

  constructor(protected httpClient: HttpClient) {}

  public getDashboard(): Observable<Dashboard>  {
    return this.httpClient.get<Dashboard>(this.DASHBOARD);
  }

  public getToolPaletteItems(): Observable<ToolPaletteItem[]> {
    return this.httpClient.get<ToolPaletteItem[]>(this.SIDENAV_ITEMS);
  }

  public getToolPaletteItem(widgetId: string): Observable<ToolPaletteItem>  {
    return this.httpClient.get<ToolPaletteItem[]>(this.SIDENAV_ITEMS).pipe(
      map((toolPaletteItems: ToolPaletteItem[]) =>
        toolPaletteItems.find(toolPaletteItem => toolPaletteItem.id === widgetId)));
  }

}
