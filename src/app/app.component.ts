import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){
    firebase.initializeApp({
        apiKey: "AIzaSyD2ptAU8T9tvlLpT2PeZNOuSR3BjRhU6pA",
        authDomain: "ng-recipe-book-7eb0f.firebaseapp.com"
    });
  }
}
