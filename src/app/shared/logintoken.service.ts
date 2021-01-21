import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from './AdInstConstant';
import { environment } from 'environments/environment';
import { CurrentUserContextService } from './CurrentUserContext/current-user-context.service';
import { CurrentUserContext } from './model/CurrentUserContext.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogintokenService {
  

  constructor(private http: HttpClient,private currentUserContextService: CurrentUserContextService) {

  }

  LoginWithToken(token: string) {
    this.http.post(AdInsConstant.LoginWithToken, { ModuleCode: environment.Module }).subscribe(
      (response) => {
        var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
        //window.location.href = url;
      }
    );
  }


}
