[Angular Reactive Forms- Deborah Kurata](#top)

## Angular Forms

```
                                  Template-driven | Reactive(Model-driven)
                                      Easy to use | More flexible ->more complex scenarios
                             Similar to AngularJS | Immutable data model
   Two-way data binding -> Minimal component code | Easier to perform an action on a value change
Automatically tracks form and input element state | Reactive transformations ->DebounceTimeor DistinctUntilChanged
                                                  | Easily add input elements dynamically
                                                  |Easier unit testing
--------------------------------------------------|-----------------------------------------------
                              Genrated form model | Manually created form model
                                  HTML Validation | Validation in the class
                             Two-way data binding | No two-way data binding
```


Template-driven | Reactive(Model-driven)
---|---
![](https://i.imgur.com/271ZFOC.png)|![](https://i.imgur.com/KnVvaPY.png)
![](https://i.imgur.com/AUUhtRy.png)|![](https://i.imgur.com/ud2i9e9.png)
![](https://i.imgur.com/4Lfgk0t.png)|![](https://i.imgur.com/lzMmxn3.png)
![](https://i.imgur.com/uVBSAEO.png)|![](https://i.imgur.com/eZreduO.png)

### Angular Form State

![](https://i.imgur.com/Ay5es5M.png)

Situation | State
---|--
Value changed| pristine, dirty
Validity | valid, errors
Visited| touched, untouched

### using FormBuilder to simplying

![](https://i.imgur.com/aVIhUJR.png)

[back to top](#top)

## Form Validator

### Adjusting Validation Rules at Runtime

```javascript
myControl.setValidators(Validators.required);
myControl.setValidators([Validators.required, Validators.maxLength(30)]);
myControl.clearValidators();
myControl.updateValueAndValidity();
```

### Customer Validator

wrap the validator function in a factory function

```javascript
//1) no parmaters
rating: [null, ratingRange],
function myValidator(c: AbstractControl) { [key: string]: boolean} | null {
  if(somethingIsWrong) {
    return { 'myValidator': true }
  }
  return null;
}
//use in
this.customerForm= this.fb.group({
  firstName: ['', myValidator('test')]
});
//sample
function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
    if(c.value !== null && (isNaN(c.value) || c.value<1 || c.value>5)){
      return { 'range': true };
    }
    return null;
}
this.customerForm= this.fb.group({
  rating: [null, ratingRange],
});
//2) with parameters
rating: [null, ratingRange(1,5)],
function myValidator(param1: any, param2: any): ValidatorFn  {
  return (c: AbstractControl): {[key: string]: boolean} | null) => {
    if(somethingIsWrong) {
      return { 'myValidator': true }
    }
  return null;
  };
}
function ratingRange(min: Number, max: Number): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value !== null && (isNaN(c.value) || c.value<min || c.value>max)){
      return { 'range': true };
    } else {
      return null;
    }
  }
}this.customerForm= this.fb.group({
  rating: [null, ratingRange(1, 5)],
});
```

## Cross-field(custom Validator) Validation- Nested FormGroup

![](https://i.imgur.com/j1EMHDW.png)

```javascript
function crossValidator(c: AbstractControl): { [key: string]: boolean} | null {
  const startControl = c.get('start');
  const endControl = c.get('end');
  if(startControl.value !== endControl.value) {
    return { 'match': true }
  }
  return null;
}
// sample
//1) define
function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if(emailControl.value !== confirmControl.value) {
    return { 'match': true };
  }
  return null;
}
//use
this.customerForm = this.fb.group({
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailMatcher }),
    });
```

```html
// template
<div formGroupName="emailGroup">
  <input class="form-control" id="emailId" type="email"
         formControlName="email"
         [ngClass]="{'is-invalid': customerForm.get('emailGroup').errors || ((customerForm.get('emailGroup.email').touched || customerForm.get('emailGroup.email').dirty) && !customerForm.get('emailGroup.email').valid) }" />
  <span class="invalid-feedback">
    <span *ngIf="customerForm.get('emailGroup.email').errors?.required">Please enter email address.</span>
    <span *ngIf="customerForm.get('emailGroup.email').errors?.email">Please enter correct email address.</span>
  </span>
  <input class="form-control" id="confirmEmailId" type="email"
         formControlName="confirmEmail"
         [ngClass]="{'is-invalid': customerForm.get('emailGroup').errors || ((customerForm.get('emailGroup.confirmEmail').touched || customerForm.get('emailGroup.confirmEmail').dirty) && !customerForm.get('emailGroup.confirmEmail').valid) }" />
  <span class="invalid-feedback">
    <span *ngIf="customerForm.get('emailGroup.confirmEmail').errors?.required">Please confirm your email address.</span>
    <!-- note: using mailGroup here-->
    <span *ngIf="customerForm.get('emailGroup').errors?.match">The confirmation does not match the email address.</span>
  </span>
</div>
```

[back to top](#top)

## Reacting to changes

### Observable method to react changes

- Watching: `valueChanges.subscribe()` and `statusChanges.subscribe()`
  - note: it is Observable
- Reacting:
  - adjust validation rules
  - handle validation message
  - modify user interface element
  - ...

```javascript
//Watching
const phoneControl= this.customerForm.get('phone');
phoneControl.valueChanges.subscribe();
phoneControl.statusChanges.subscribe();
```

### Reactive Transformations

- debounceTime
- throttleTime : Emits a value, then ignores subsequent values for a specific amount of time
- distinctUntilChanged: Suppresses duplicate consecutive items

```javascript
const emailControl = this.customerForm.get('emailGroup.email');
emailControl.valueChanges
            .pipe( debounceTime(1000) )
            .subscribe(
              value => this.setMesssages(emailControl)
            );
```

[back to top](#top)

## Dynamically Duplicate Input Elements

![](https://i.imgur.com/MQ7Zr8x.png)

- FormArray: consist of formControls or formGroups
- `this.myArray = new FormArray([..])`
- `this.myArray = this.fb.array([...])`

1. Define FormGroup

```javascript
// get inital value of formGroup
get addresses(): FormArray {
  return <FormArray>this.customerForm.get('addresses');
}
// initalize
this.customerForm = this.fb.group({
  //...
  addresses: this.fb.array([this.buildAddress()])  //change to formArray
});
buildAddress(): FormGroup {
  return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: '',
      state: '',
      zip: ''
  });
}
// add address group dynamically
addAddress(): void {
    this.addresses.push(this.buildAddress());
}
```

2. modify template to use formGroup

```html
<!-- 1) define formArrayName -->
<div formArrayName="addresses" *ngFor="let address of addresses.controls; let i=index">
  <!-- 2) define duplicate name dynamically, so can addAddress after as a group -->
  <div [formGroupName]="i">
    <div class="form-group row mb-2">
      <label class="col-md-2 col-form-label pt-0">Address Type</label>
      <input class="form-check-input" id="addressType1Id" type="radio" value="home"
             formControlName="addressType"
             name="addressType"> Home</label>
      <input class="form-check-input" id="addressType1Id" type="radio" value="work"
             formControlName="addressType"
             name="addressType"> Work</label>
      <input class="form-check-input" id="addressType1Id" type="radio" value="other"
             formControlName="addressType"
             name="addressType"> Other</label>
    </div>

    <div class="form-group row mb-2">
      <!-- 3) change for to attr.for so it can use dynamical value  -->
      <label class="col-md-2 col-form-label"
             attr.for="{{'street1Id' + i}}">Street Address 1</label>
      <!-- 4) change id to dynamically -->
      <input class="form-control" type="text" placeholder="Street address"
             id="{{'street1Id' + i}}"
             formControlName="street1"
            name="street1">
    </div>
    <!-- ... -->
    <div class="form-group row mb-2">
      <button class="btn btn-outline-primary" type="button"
              [title]="addresses.valid ? 'Add another mailing address' : 'Disabled until the existing address data is valid'"
              [disabled]="!addresses.valid" (click)="addAddress()">Add Another Address</button>
    </div>
  </div>
</div>
```

[back to top](#top)

## Populating Reactive Form with data

![](https://i.imgur.com/5CtHOsU.png)

```javascript
// subscribe data coming from Http service-product.service.ts
ngOnInit(): void {
  //...
  // Read the product Id from the route parameter
  this.sub = this.route.paramMap.subscribe(
    params => {
      const id = +params.get('id');
      this.getProduct(id);
    }
  );
}
getProduct(id: number): void {
  this.productService.getProduct(id)
      .subscribe(
        (product: Product) => this.displayProduct(product),
        (error: any) => this.errorMessage = <any>error
      );
}
displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
    // Update the data on the form, using patchValue due to modify part of parmeters
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
}
// saving Edits
saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        //merge form values to original values, user edited data will overwrite original data
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
              .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.productService.updateProduct(p)
              .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
}
onSaveComplete(): void {
  // Reset the form to clear the flags
  this.productForm.reset();
  this.router.navigate(['/products']);
}
```

[back to top](#top)

> Reference
- [Deborah's Developer MindScape](https://blogs.msmvps.com/deborahk/angular-2-reactive-forms-problem-solver/)
- https://github.com/DeborahK/Angular-ReactiveForms