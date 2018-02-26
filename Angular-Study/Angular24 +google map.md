## Angular 2,4 + google map

### Basic setup

- [Angular Google Maps (AGM)](https://angular-maps.com/):   angular 4.0x only, `npm install @agm/core --save`
- [snazzy-info-window](https://github.com/atmist/snazzy-info-window): `npm install @agm/snazzy-info-window snazzy-info-window`, custom info window that are styleable via CSS or Angular inputs
- [Get Latitude and Longitude](https://www.latlong.net/)

```javascript
/* .angular-cli.json */
"styles": [
  "styles.css",
  "../node_modules/snazzy-info-window/dist/snazzy-info-window.css"
]
/* src/app/app.module.ts */
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
@NgModule({
  imports: [
    //...
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    }),
    AgmSnazzyInfoWindowModule
  ],
/* xxx.Component.html */
<agm-map [latitude]="lat" [longitude]="lng">
  <agm-marker [latitude]="lat" [longitude]="lng">
    // <agm-info-window>Information</agm-info-window>
    <!-- sanzzy marker window -->
    <agm-snazzy-info-window [maxWidth]="200" [closeWhenOthersOpen]="true">
      <ng-template>
        My first Snazzy Info Window!
      </ng-template>
    </agm-snazzy-info-window>
  </agm-marker>
</agm-map>
/* xxx.Component.ts */
export class AppComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;
}
/* xxx.Component.css */
agm-map {  height: 300px; }   //CSS styling is required!
```

### [Function and event](https://stackblitz.com/edit/angular-google-maps-demo)

```javascript
/* xxx.Component.html */
<agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom"
         [disableDefaultUI]="false"
         [zoomControl]="false"
         (mapClick)="mapClicked($event)"
>
  <agm-marker *ngFor="let m of markers; let i=index"
              (markerClick)="clickedMarker(m.label,i)"
              [latitude]="m.lat"
              [longitude]="m.lng"
              [label]="m.label"
              [markerDraggable]="m.draggable"
              (dragEnd)="markerDragEnd(m, $event)">
    <agm-info-window>{{m.name}}</agm-info-window>
  </agm-marker>
  <agm-circle [latitude]="lat + 0.3" [longitude]="lng" 
      [radius]="5000"
      [fillColor]="'red'"
      [circleDraggable]="true"
      [editable]="true">
  </agm-circle>
</agm-map>
/* xxx.Component.ts */
export class AppComponent {
  title: string = 'My first AGM project';
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  zoom: number = 8;
  clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
  mapClicked($event: MouseEvent) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'New',
        draggable: true
      });
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  markers: marker[] = [
    {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  }
  ]
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
```

### Sample 1: Google map with autocomplete

http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/

```javascript
/* xxx.Component.html */
<div class="form-group">
  <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
</div>
<agm-map [latitude]="lat" [longitude]="lng" [scrollwheel]="false" [zoom]="zoom">
    <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
</agm-map>
/* xxx.Component.ts */
import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
declare var google: any;     //for error: cannot find google
//...
export class AppComponent implements OnInit {
  title: string = 'My AGM project with autocomplete';
  // initial center position for the map
  lat: number;
  lng: number;
  zoom: number;
  searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}
  ngOnInit() {
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place = autocomplete.getPlace();   //get the place result
          if (place.geometry === undefined || place.geometry === null) {   //verify result
            return;
          }
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 14;
        });
      });
    });
  }
  private setCurrentPosition() {
   if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition((position) => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       this.zoom = 10;
     });
   }
 }
}
```

