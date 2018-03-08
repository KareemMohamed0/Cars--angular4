import { Component } from '@angular/core';
import { TokenService } from './service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public token: TokenService, private router: Router) {

  }

  logout() {
    this.token.logOut();
    this.router.navigate(['']);

  }
}
