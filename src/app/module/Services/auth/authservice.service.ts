import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import firebase from 'firebase/compat';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  apiUrl = environment.apiUrl
  USERS_social_login: string = this.apiUrl + 'jh/public/socialLogin';
  constructor(public dialog: MatDialog,public router:Router ,public afs: AngularFirestore, public afAuth: AngularFireAuth, public http: HttpClient) { }
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.SetUserData(result.user)
        this.SendVerificationMail(result.user);


      })
      .catch((error) => {
        console.log(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  SendVerificationMail(userData: any) {
    var user = JSON.parse(JSON.stringify(userData)!);
    let name = user.displayName;
    let gtoken = JSON.parse(JSON.stringify(user)).stsTokenManager.accessToken;
    console.log(gtoken);
    
    let email = user.email;
    var data = {
      "emailAddress": email,
      "name": name,
      "socialToken": gtoken,
      "sourceLogin": "google",
      "deviceToken": null,
      "deviceType": "web"
    };
    this.gmailAuth(data);
  }
  gmailAuth(data: any) {
    this.mailAuth(data).subscribe(res => {
      if (res.message === "login_success") {
        localStorage.setItem('token', res.jobBossToken);
        localStorage.setItem('userId', res.userId);
        this.dialog.closeAll();
        this.router.navigateByUrl('/home');
      }
    })
  };
  mailAuth(Postdata): Observable<any> {
    return this.http.post(this.USERS_social_login, Postdata)
  }
}

