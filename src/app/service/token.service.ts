import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }
  getTOken() {
    return localStorage.getItem('TOKEN');
  }
  logOut() {
    localStorage.removeItem('TOKEN');
  }
  isLoggedIn() {
    return tokenNotExpired('TOKEN');
  }

}
