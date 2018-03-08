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
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  load: boolean;
  countris: Object;
  makers: Object;
  constructor(private router: Router, private http: HttpService, public snackBar: MatSnackBar) { }

  matcher = new MyErrorStateMatcher();
  myForm: FormGroup;
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  ngOnInit() {
    this.getMakers();
    this.getCountry();
    // the long way
    this.myForm = new FormGroup({
      model: new FormControl('', [
        <any>Validators.required,
        <any>Validators.minLength(2),
        <any>Validators.maxLength(10)
      ]

      ),
      year: new FormControl('', [<any>Validators.required]),
      makeId: new FormControl('', [<any>Validators.required]),
      countryId: new FormControl('', [<any>Validators.required]),
      photoUrl: new FormControl('', [
        <any>Validators.required],
        // <any>Validators.pattern("")
      )


    });
  }

  addCar(value, valid) {
    this.load = true;
    this.http.postData('car/add', value, true)
      .subscribe(
        (res) => {
          this.load = false;
          // this.myForm.value = {}
          this.router.navigate(['/home']);

          this.snackBar.open("Success", `${value.model} is added successfully`, {
            duration: 2000,
          });

        }, (err) => {
          this.load = false;

          this.snackBar.open("Error", 'Somethig went wrong', {
            duration: 2000,
          });
        })

    // this.myForm.pristine == true;
  }

  getMakers() {
    this.http.getData('make/get/all', true).subscribe(
      (res) => {
        this.makers = res;
      },
      (err) => {
        this.snackBar.open("Error", 'Somethig went wrong', {
          duration: 2000,
        });
      }
    )
  }

  getCountry() {
    this.http.getData('country/get/all', true).subscribe(
      (res) => {
        this.countris = res;
      },
      (err) => {
        this.snackBar.open("Error", 'Somethig went wrong', {
          duration: 2000,
        });
      }
    )
  }

}
