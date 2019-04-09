import { BaseObj } from 'app/shared/model/BaseObj.model';
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
  baseClass: BaseObj;

  constructor(private http: HttpClient,
    private datepipe: DatePipe) {
    //this.getIpAddress();
  }

  private generateHeader():any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin':'true'
      })
    };
    return httpOptions;
  }

  getData(url:string,withHeader:boolean=true){
    const httpOptions = this.generateHeader();
    if(withHeader==true)
    {
      return this.http.get<any>(url,httpOptions);
    }
    return this.http.get<any>(url);
  }

  post(url, data?,withHeader:boolean=true) {
    this.baseClass = this.generateBaseClass();
    this.baseClass.RequestObject = data;
    const httpOptions = this.generateHeader();
    if(withHeader==true)
    {
      return this.http.post(url, data,httpOptions);
    }
    else{
      return this.http.post(url, data);
    }

  }

 getIpAddress(): any {
    return this.ipAddress = this.http.get<{ip: string}>('')
      .subscribe( data => {});

    }

generateBaseClass(data?): BaseObj {
  this.loc = this.ipAddress.loc.split(',');
  const getObject = JSON.parse(localStorage.getItem('currentUserContext'));
  const getFormAccess = JSON.parse(localStorage.getItem('pageAccess'));
  const localIp = localStorage.getItem("LocalIp");

  return  this.baseClass = {
    Ip : this.ipAddress.ip,
    Latitude : this.loc[0],
    Longitude : this.loc[1],
    UserName : getObject.value['user'],
    Role : getObject.value['role'],
    Office: getObject.value['office'],
    LastPageAccess: getFormAccess.value['currUrl'],
    LastPageAccessTime: getFormAccess.value['bussinessDt'],
    LocalIp:localIp,
    RequestObject: data
  }
}
}
