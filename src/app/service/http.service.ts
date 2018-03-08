import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class HttpService {
  baseUrl: string = "https://quiet-island-25921.herokuapp.com/";
  constructor(private http: HttpClient, private token: TokenService) { }

  getData(url: string, secure: boolean = false) {
    let header = {};
    if (secure)
      header = {
        headers: new HttpHeaders().set('Authorization', this.token.getTOken())
      }
    return this.http.get(this.baseUrl + url, header);
  }
  postData(url: string, data: any, secure: boolean = false) {
    let header = {};
    if (secure)
      header = {
        headers: new HttpHeaders().set('Authorization', this.token.getTOken())
      }
    return this.http.post(this.baseUrl + url, data, header);
  }

  deleteData(url: string, secure: boolean = false) {
    let header = {};
    if (secure)
      header = {
        headers: new HttpHeaders().set('Authorization', this.token.getTOken())
      }
    return this.http.delete(this.baseUrl + url, header);
  }

}
