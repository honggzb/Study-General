import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-username',
  templateUrl: './generate-username.component.html',
  styleUrls: ['./generate-username.component.scss']
})

export class GenerateUsernameComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  fullname: string = ''
  constructor() {

  }

  onFnKeyup(data){
    this.firstname = data
  }

  onLnKeyup(data){
    this.lastname = data
  }

  generateName(){
    this.fullname = this.firstname.toLowerCase() +'_' + this.lastname.toLowerCase() +'_'+ Math.floor(Math.random()*10)
  }

  ngOnInit() {
  }

}
