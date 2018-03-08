import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  load: boolean;
  displayedColumns = ['id', 'make', 'model', 'country', 'year', 'delete'];
  dataSource: any;
  constructor(private http: HttpService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.load = true;
    this.http.getData('car/get/all', true)
      .subscribe((res) => {
        this.dataSource = res;
        this.load = false;

      }, (err) => {
        this.load = false;
        this.snackBar.open("Error", "Something went wronf", {
          duration: 2000,
        });
      })
  }
  carDetails(id) {
    this.router.navigate([`car/${id}`]);
  }
  deleteCar(id) {
    this.http.deleteData(`car/delete/${id}`, true)
      .subscribe(
        (res) => {
          this.dataSource = this.dataSource.filter(ele => ele.id != id)
          this.snackBar.open("Success", "Deleted successfully", {
            duration: 2000,
          });
        },
        (err) => {
          this.snackBar.open("Error", "Something went wronf", {
            duration: 2000,
          });
        }
      )

  }

}
