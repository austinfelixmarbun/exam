import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DataTableColumnCellTreeToggle } from '@swimlane/ngx-datatable';
export declare type HttpObserve = 'body' | 'events' | 'response';

@Injectable({
  providedIn: 'root'
})
export class AdInsHttpServiceService {

  ipAddress: any;
  constructor(private http: HttpClient,
    private datepipe: DatePipe) {
    //this.getIpAddress();
  }

   createHeader() {
    // var displayDate = new Date().toLocaleDateString();
    const httpHeaders = new HttpHeaders({
      'Authorization' : 'my-token' ,
      // 'Content-Type' : 'application/json',
      // 'Cache-Control': 'no-cache',
      // 'IP' : this.ipAddress.ip,
      // 'City' : this.ipAddress.city,
      // 'UserName' : 'user1',
      // 'DateTime' : new Date().toLocaleDateString()
    });
    return httpHeaders;
  }

  post(url, data?) {
    var tempData = {
      'Content-Type':'application/json',
      'Cache-Control':'no-cache',
      'IP':this.ipAddress.ip,
      'DateTime':new Date().toLocaleDateString(),
      'RequestObject':data
    };
    console.log(tempData);
    return this.http.post(url, tempData, {
      headers: this.createHeader()
    });
  }

 getIpAddress(): any {
    return this.ipAddress = this.http.get<{ip: string}>('https://ipinfo.io/json')
      .subscribe( data => {});
    }
}
