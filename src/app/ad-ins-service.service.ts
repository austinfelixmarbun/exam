import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpRequestObj} from 'app/shared/model/HttpRequestObj.model';
import {IpObjModel} from 'app/shared/model/IpObj.model';
import { HttpHeaders } from '@angular/common/http';

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

  postData(url:string,requestObj:any):any{
    var httpRequest = new HttpRequestObj();
    var currentUserContext = localStorage.getItem("currentUserContext")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    requestObj.orderBy={"Key":"CountView","Value":"FALSE"};
    // httpRequest.UserName=currentUserContext.
    console.log(httpRequest);
    console.log(JSON.stringify(requestObj));
    return this.httpClient.post(url,requestObj);
  }

}
