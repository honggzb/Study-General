import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
    if(c.value !== null && (isNaN(c.value) || c.value<1 || c.value>5)){
      return { 'range': true };
    }
    return null;
}
// function ratingRange(min: Number, max: Number): ValidatorFn {
//   return (c: AbstractControl): {[key: string]: boolean} | null => {
//     if(c.value !== null && (isNaN(c.value) || c.value<min || c.value>max)){
//       return { 'range': true };
//     } else {
//       return null;
//     }
//   }
// }
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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm: FormGroup;
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange],  //[null, [Validators.min(1), Validators.max(5)]],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])  //change to formArray
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
                .pipe( debounceTime(1000) )
                .subscribe(
                  value => this.setMesssages(emailControl)
                );
  }

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

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  populateTestData(): void {
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: {email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com'},
      phone: '',
      notification: 'email',
      rating: [null, ratingRange],
      sendCatalog: false,
      address: []
    });
  }

  //add or clear phone validate according to notification radio value
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMesssages(c: AbstractControl): void {
    this.emailMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key => this.emailMessage += this.validationMessages[key]).join(' ');
    }
  }
}
