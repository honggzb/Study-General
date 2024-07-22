import { AsyncPipe, NgTemplateOutlet, NgIf } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  imports: [MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet],
  standalone: true,
})
export class LoadingIndicatorComponent implements OnInit{
  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    private loadingService: LoadingService,
    private router: Router){
      this.loading$ = loadingService.loading$;
    }

  ngOnInit(): void {
    if(this.detectRouteTransitions) {
      this.router.events
      .pipe(
        tap((event) => {
          if(event instanceof RouteConfigLoadStart) {
            setTimeout(() => { this.loadingService.loadingOn(); }, 5000);
            //this.loadingService.loadingOn();
          } else if(event instanceof RouteConfigLoadEnd) {
            this.loadingService.loadingOff();
          }
        })
      ).subscribe();
    }
  }
}
