import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpRequestObj} from 'app/shared/model/HttpRequestObj.model';
import {IpObjModel} from 'app/shared/model/IpObj.model';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdInsServiceService {

  ipAddress:string;
  loc:string;
  httpRequest:HttpRequestObj;
  ipObj:IpObjModel;
  constructor(private httpClient:HttpClient) { }

  getIpAddress(): any {
    return this.httpClient.get<any>('https://ipinfo.io/json')
    .subscribe( data => {
      localStorage.setItem("IP",JSON.stringify(data));
    });
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

  getData(url:string,withHeader:boolean=false){
    const httpOptions = this.generateHeader();
    if(withHeader==true)
    {
      return this.httpClient.get<any>(url,httpOptions);
    }
    return this.httpClient.get<any>(url);
  }

  postDataDummy(url:string,requestObj:any):any{
    var httpRequest = new HttpRequestObj();
    var currentUserContext = localStorage.getItem("currentUserContext")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    // httpRequest.UserName=currentUserContext.
    console.log(httpRequest);
    requestObj.orderBy={"Key":"CountView","Value":"FALSE"};
    console.log(JSON.stringify(requestObj));
    return this.httpClient.post(url,requestObj);
  }

  postData(url:string,requestObj:any):any{
    var httpRequest = new HttpRequestObj();
    var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accepts':'application/json',
        'Authentication':'my-authentication'
      })
    };
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    httpRequest.UserName=currentUserContext.UserName;
    httpRequest.RequestObject = requestObj;

    console.log(JSON.stringify(httpRequest));
    return this.httpClient.post(url,httpRequest,httpOptions);
  }

}
