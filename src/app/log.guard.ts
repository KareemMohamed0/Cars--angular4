import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Injectable()
export class LogGuard implements CanActivate {
  constructor(public token: TokenService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.token.isLoggedIn())
      return true;
    else {
      this.router.navigate(['/home']);
      return false;
    }

  }
}
