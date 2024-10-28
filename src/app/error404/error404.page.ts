import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {
  isAuthenticated = false;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
}
