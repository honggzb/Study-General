import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

interface PersonInfo {
  firstname: string,
  age: number,
  lastname: string,
  twitter: string
}

@Component({
  selector: 'app-reactive-form-challenge',
  templateUrl: './reactive-form-challenge.component.html',
  styleUrls: ['./reactive-form-challenge.component.scss']
})

export class ReactiveFormChallengeComponent implements OnInit {
  form: FormGroup;

  //   person = {
  //   firstname: 'Coder',
  //   age: 25,
  //   lastname: 'Byte',
  //   twitter: '@coderbyte'
  // };
    personProps: PersonInfo[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: 'Coder',
      age: 25,
      lastname: 'Byte',
      twitter: '@coderbyte'
    });
  }

  saveFormData(){
    localStorage.setItem('personInfo', JSON.stringify(this.form.value))
  }

  processForm(){
    this.saveFormData();
    const personData = JSON.parse(localStorage.getItem('personInfo'));
    this.personProps.push(personData)
  }

  ngOnInit() {
    // const formDataObj = {};
    // for (const prop of Object.keys(this.person)) {
    //   formDataObj[prop] = new FormControl(this.person[prop]);
    //   this.personProps.push(prop);
    //   console.log(this.personProps);
    // }
    // this.form = new FormGroup(formDataObj);
  }

}
