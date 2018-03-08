import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  load: boolean;
  car: any;
  constructor(private route: ActivatedRoute, private http: HttpService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.load = true;
    this.route.params.subscribe(params => {
      this.http.getData(`car/${params.id}`, true)
        .subscribe((res) => {
          this.car = res;
          this.load = false;

        }, (err) => {
          this.load = false;

          this.snackBar.open("Error", 'Somethig went wrong', {
            duration: 2000,
          });
        })

    })
  }

}
