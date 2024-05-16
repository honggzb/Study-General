import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

interface PhoneBook {
  firstName: string,
  lastName: string,
  phone: number
}

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})

export class PhoneBookComponent implements OnInit {
  phoneBook: FormGroup;
  phoneLists: PhoneBook[] = [];

  constructor(private fb: FormBuilder) {
    this.phoneBook = this.fb.group({
      firstName: 'Coder',
      lastName: 'Byte',
      phone: '8885559999'
    });
  }

  savePhoneBook() {
    localStorage.setItem('phoneBook', JSON.stringify(this.phoneBook.value));
    if(this.phoneLists.length){
      this.phoneLists.sort((a, b) => a.lastName.localeCompare(b.lastName))
      }
  };

  processForm() {
    this.savePhoneBook();
    const phoneBookData = JSON.parse(localStorage.getItem('phoneBook'));
    this.phoneLists.push(phoneBookData);
  }

  ngOnInit() {
  }

}
