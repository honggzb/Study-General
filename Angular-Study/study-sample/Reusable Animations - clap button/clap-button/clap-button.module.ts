import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterBubbleComponent } from './components/counter-bubble.component';
import { TotalCounterComponent } from './components/total-counter.component';
import { FabComponent } from './components/fab.component';
import { ClapButtonComponent } from './containers/clap-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FabComponent,
    CounterBubbleComponent,
    TotalCounterComponent,
    ClapButtonComponent
  ],
  exports: [ClapButtonComponent]
})
export class ClapButtonModule {}