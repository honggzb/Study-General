import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

interface PhoneBook {
  firstName: string,
  lastName: string,
  phone: number
}


@Component({
  selector: 'app-phone-book-review',
  templateUrl: './phone-book-review.component.html',
  styleUrls: ['./phone-book-review.component.scss']
})
export class PhoneBookReviewComponent implements OnInit {

  phoneBookForm: FormGroup;
  phoneBookList: PhoneBook[] = [];

  constructor(private pb: FormBuilder) {
    this.phoneBookForm = this.pb.group({
      firstName: 'Coder',
      lastName: 'Byte',
      phone: 8885559999
    })
  }

  ngOnInit() {

  }

  savePhoneBook(){
    localStorage.setItem('phoneBook', JSON.stringify(this.phoneBookForm.value));
  }

  updatePhone(){
    if(this.phoneBookList.length){
      this.phoneBookList.sort( (a, b) => a.lastName.localeCompare(b.lastName))
    }
   this.savePhoneBook();
   const phoneBookData = JSON.parse(localStorage.getItem('phoneBook'));
   this.phoneBookList.push(phoneBookData)
  }

}
