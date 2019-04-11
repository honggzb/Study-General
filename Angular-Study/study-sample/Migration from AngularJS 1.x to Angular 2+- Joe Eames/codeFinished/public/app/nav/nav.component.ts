import { Directive, Injector, ElementRef } from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";

@Directive({
  selector: 'app-nav'
})
export class NavComponent extends UpgradeComponent {
    constructor(elementRef: ElementRef, injector: Injector){
        super('nav', elementRef, injector);
    }
}
