import { inject } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core/';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroComponent } from './../hero/hero.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo : any = null;
  onClick(){
    this.navigatedTo = this.linkParams;
  }
}

describe('HerosComponent (Deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ];
    // 1) mocking an injected service
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      //schemas: [NO_ERRORS_SCHEMA] // ignore child directive/component
    });
    fixture = TestBed.createComponent(HeroesComponent);
    // both heroComponent and herosComponent get initialized
    //mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    // child component- hero component
    const heroComponenteDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponenteDEs.length).toEqual(3);
    expect(heroComponenteDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
    for(let i=0; i<heroComponenteDEs.length; i++){
      expect(heroComponenteDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
  // test delete interaction, emitting event from children
  it(`should call heroService.deleteHero when Hero component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // choose button in child component
    // heroComponents[0].query(By.css('button'))
    //                  .triggerEventHandler('click', { stopPropagation: () =>{}});
    //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);  // jjust need pass undefined
    heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
  // test Test Interacting with Input Boxes
  it(`should add a new hero to the hero list when the add button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    //checking if add to ul list
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it(`should have the correct route for the first hero`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  // fire ngOninit
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
                                      .injector.get(RouterLinkDirectiveStub);
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBe('/detail/1');
  });

});
