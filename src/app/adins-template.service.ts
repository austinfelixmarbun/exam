import { Injectable } from '@angular/core';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from './shared/AdInsHelper';
import {UcTemplateService} from '@adins/uctemplate';
import { environment } from 'environments/environment';
import { NavigationConstant } from './shared/NavigationConstant';
import * as _moment from 'moment';
import * as env from "assets/config/enviConfig.json";
import * as Module from '././form-template';

const listEnvironments = [
  { environment: 'FOU', url: environment.FoundationR3Url},
  { environment: 'FOUR3WEB', url: environment.FoundationR3Web },
  { environment: 'LOSR3WEB', url: environment.losR3Web },
  { environment: 'LOS', url: environment.LosURL },
  { environment: 'TAX', url: environment.TaxUrl},
  ];

@Injectable({
  providedIn: 'root'
})
export class AdinsTemplateService extends UcTemplateService{
  
  constructor(private UrlConstant: UrlConstantNew) {
    super();
    this.UrlConstant = UrlConstant;
    this.configure();
  }

  getCookie(cookieService: CookieService, key: string): any {
    return AdInsHelper.GetCookie(cookieService, key);
  }

  private configure() {
    this.environment  = environment;
    this.envConfig    = env;
    this.urlConstant  = this.UrlConstant;
    this.navConstant  = NavigationConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
  }
}
