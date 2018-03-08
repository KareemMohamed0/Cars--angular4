import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router'
import { HttpService } from '../service/http.service';
import { MatSnackBar } from '@angular/material';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  load: boolean;
  constructor(private router: Router, private http: HttpService, public snackBar: MatSnackBar) { }

  matcher = new MyErrorStateMatcher();
  myForm: FormGroup;
  ngOnInit() {

    // the long way
    this.myForm = new FormGroup({
      country: new FormControl('', [
        <any>Validators.required,
        <any>Validators.minLength(2),
        <any>Validators.maxLength(20),
      ]),

    });

  }



  addCountry(value, valid) {
    this.load = true;
    this.http.postData('country/add', value, true)
      .subscribe(
        (res) => {
          this.load = false;
          this.snackBar.open("Success", `${value.country} is added successfully`, {
            duration: 2000,
          });

        }, (err) => {
          this.load = false;
          console.log(err)
          this.snackBar.open("Error", err.error, {
            duration: 2000,
          });
        })
    // this.router.navigate(['/home']);
  }



}
