import { AppContextService } from '@adins/fe-core';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from '../AdInsHelper';
import { environment } from 'environments/environment';
import { URLConstant } from '../constant/URLConstant';
import { NavigationConstant } from '../NavigationConstant';

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService extends AppContextService {

  get environment(): any {
    return environment;
  }

  get authUser(): any {
    return AdInsHelper.GetUserAccess(this.cookieService);
  }

  get urlConstant(): any {
    return URLConstant;
  }

  get navConstant(): any {
    return NavigationConstant;
  }

  get envConfig(): any {
    return URLConstant.env;
  }

  constructor(private readonly cookieService: CookieService) {
    super();
  }
}
