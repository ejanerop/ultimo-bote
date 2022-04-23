import { Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: any;
  private _token: string = '';
  private isAuthenticated: boolean = false;

  constructor() {}

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  get authenticated() {
    return this.isAuthenticated;
  }

  login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'alain@laleña.com',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this._token = credential?.accessToken || '';
        // The signed-in user info.
        this._user = result.user;
        this.isAuthenticated = true;
        console.log(this.user);
        console.log(this.token);
        console.log(this.isAuthenticated);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  logout() {
    const auth = getAuth();
    auth.signOut();
    this._user = null;
    this._token = '';
    this.isAuthenticated = false;
  }
}
