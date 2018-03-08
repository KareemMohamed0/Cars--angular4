import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router'

import { HttpService } from '../service/http.service';
import { TokenService } from '../service/token.service';
import { MatSnackBar } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  load: boolean;
  constructor(private router: Router, private http: HttpService, private token: TokenService, public snackBar: MatSnackBar) { }

  matcher = new MyErrorStateMatcher();
  myForm: FormGroup;
  ngOnInit() {


    // the long way
    this.myForm = new FormGroup({
      email: new FormControl('', [
        <any>Validators.required,
        <any>Validators.minLength(4),
        <any>Validators.maxLength(32)
      ]),
      password: new FormControl('', [
        <any>Validators.required,
        <any>Validators.minLength(6),
        <any>Validators.maxLength(20)
      ]),

    });


  }



  login(value, valid) {
    this.load = true;
    this.http.postData('user/authenticate', value)
      .subscribe(
        (res: any) => {
          this.token.setToken(res.token);
          this.snackBar.open("Success", "logged in successfully", {
            duration: 2000,
          });
          this.load = false;
          this.router.navigate(['/home']);
        },
        (res: any) => {
          this.load = false;

          this.snackBar.open("Error", res.error.msg, {
            duration: 2000,
          });
        }
      )
  }


}
