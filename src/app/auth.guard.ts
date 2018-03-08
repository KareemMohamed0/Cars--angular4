import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './service/token.service';
import { Router } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public token: TokenService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token.isLoggedIn())
      return true;
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
