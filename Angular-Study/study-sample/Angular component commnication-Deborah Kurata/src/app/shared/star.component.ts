import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {

  @Input() rating: number;
  starPercent: string;

  ngOnChanges(): void {
    this.starPercent = (this.rating *86 /5) + 'px';
  }

}
