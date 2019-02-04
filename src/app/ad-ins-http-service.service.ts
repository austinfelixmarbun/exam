import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
export declare type HttpObserve = 'body' | 'events' | 'response';

@Injectable({
  providedIn: 'root'
})
export class AdInsHttpServiceService {

  ipAddress: any;
  loc: string[];

  constructor(private http: HttpClient,
    private datepipe: DatePipe) {
    this.getIpAddress();
   }

   createHeader(): HttpHeaders {
    // var displayDate = new Date().toLocaleDateString();
    this.loc = this.ipAddress.loc.split(',');
    const httpHeaders = new HttpHeaders({
      'Authorization' : 'my-token' ,
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'Ip' : this.ipAddress.ip,
      'City' : this.ipAddress.city,
      'Latitude' : this.loc[0],
      'Longitude' : this.loc[1],
      'UserName' : 'user1',
      'SendDateTime' : new Date().toLocaleDateString()
    });
    return httpHeaders;
  }

  post(url, data?) {
    return this.http.post(url, data, {
      headers: this.createHeader()
    });
  }

 getIpAddress(): any {
    return this.ipAddress = this.http.get<{ip: string}>('https://ipinfo.io/json')
      .subscribe( data => {});
    }
}
