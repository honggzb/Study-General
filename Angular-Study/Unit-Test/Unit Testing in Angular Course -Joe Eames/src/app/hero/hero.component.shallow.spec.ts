import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { By } from '@angular/platform-browser';

describe('HeroComponent (Shallow Tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;  // just need using some properties of component
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]   // ignore child directive/component
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });
  // testing rendered HTML
  it('should rnder the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();  // fire ngOninit
    //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    let deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('SuperDude');
  });

});
