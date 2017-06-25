import { query } from '@angular/core/src/animation/dsl';
import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  user: Observable<firebase.User>;
  username: any;
  userImage: any;
  chatMsg: string = '';

  constructor (private _af: AngularFireDatabase, private _afAuth: AngularFireAuth ) {
    this.items = this._af.list('/messages', {
      query: {
        limitToLast: 10
      }
    });
    this.user = this._afAuth.authState;
    this.user.subscribe(userInfo => this.username = userInfo.displayName);
    this.user.subscribe(userInfo => this.username = userInfo.photoURL);
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  chatSend (message: string) {
    this.items.push({ message: message, name: this.username});
    this.chatMsg = '';
  }
}
