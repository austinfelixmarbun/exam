import { value } from './shared/data/dropdowns';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BaseClass } from './base/base-class';

export declare type HttpObserve = 'body' | 'events' | 'response';

@Injectable({
  providedIn: 'root'
})
export class AdInsHttpServiceService {

  ipAddress: any;
  loc: string[];
  baseClass: BaseClass;

  constructor(private http: HttpClient,
    private datepipe: DatePipe) {
    //this.getIpAddress();
  }

   createHeader(): HttpHeaders {
    // var displayDate = new Date().toLocaleDateString();

    const httpHeaders = new HttpHeaders({
      'Authorization' : 'my-token',
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    return httpHeaders;
  }

  post(url, data?) {
    this.baseClass = this.generateBaseClass();
    return this.http.post(url, data, {
      headers: this.createHeader()
    });
  }

 getIpAddress(): any {
    return this.ipAddress = this.http.get<{ip: string}>('https://ipinfo.io/json')
      .subscribe( data => {});

    }

generateBaseClass(data?): BaseClass {
  this.loc = this.ipAddress.loc.split(',');
  const getObject = JSON.parse(localStorage.getItem('currentUserContext'));
  const getFormAccess = JSON.parse(localStorage.getItem('pageAccess'));

  return  this.baseClass = {
  Ip : this.ipAddress.ip,
  Latitude : this.loc[0],
  Longitude : this.loc[1],
  UserName : getObject.value['user'],
  Role : getObject.value['role'],
  Office: getObject.value['office'],
  LastPageAccess: getFormAccess.value['currUrl'],
  LastPageAccessTime: getFormAccess.value['bussinessDt'],
  RequestObject: data
  }
}
}
