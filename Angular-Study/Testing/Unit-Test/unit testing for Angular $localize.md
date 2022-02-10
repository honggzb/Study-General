### test if the $localize translates the correct strings

```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'app-i18n-localize',
  templateUrl: './i18n-localize.component.html'
})
export class I18nLocalizeComponent {
  readonly title: string = $localize `:@@title:Hello World!`;
}
//unit test
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nLocalizeComponent } from './i18n-localize.component';

describe('I18nLocalizeComponent', () => {
  let component: I18nLocalizeComponent;
  let fixture: ComponentFixture<I18nLocalizeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nLocalizeComponent ],
    }).compileComponents();
  }));
  beforeEach(() => {
    $localize.calls.reset();
    $localize.and.returnValue('Hello World!)';
    fixture = TestBed.createComponent(I18nLocalizeComponent);
    component = fixture.componentInstance;
  });
  it('should call $localize once', () => {
    expect($localize).toHaveBeenCalledTimes(1);
  });
});
```

> Reference
- [Advice on testing Angular $localize](https://stackoverflow.com/questions/60847354/advice-on-testing-angular-localize-angular-9)
- https://github.com/ross-moug/ng9-i18n-unit-test
- https://github.com/FlorianUhlmann/ng12-i18n-unit-test
