import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-intro',
  templateUrl: './my-intro.component.html',
  styleUrls: ['./my-intro.component.css']
})
export class MyIntroComponent implements OnInit {

  loadComponent:boolean;

  constructor() { }

  ngOnInit() {
  }

  hideIntro() {
    this.loadComponent = true;

  }

}
