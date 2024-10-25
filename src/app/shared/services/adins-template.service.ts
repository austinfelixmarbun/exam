import {Injectable} from '@angular/core';
import {UcTemplateService} from '@adins/uctemplate';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import * as Module from '../../form-template';
import { envi, URLConstant } from '../constant/URLConstant';
import { NavigationConstant } from '../NavigationConstant';

const listEnvironments = [
  { environment: 'FOU', url: envi.FoundationR3Url},
  { environment: 'FOU_WEB', url: envi.FoundationR3Web },
  { environment: 'LOSR3WEB', url: envi.losR3Web },
  { environment: 'LMSR3WEB', url: envi.lmsR3Web },
  { environment: 'LOS', url: envi.losUrl },
  { environment: 'CashBankUrl', url: envi.CashBankUrl },
  { environment: 'TAX', url: envi.TaxUrl},
];

@Injectable({
  providedIn: 'root'
})
export class AdinsTemplateService extends UcTemplateService {

  constructor() {
    super();
    this.configure();
  }

  getCookie(cookieService: CookieService, key: string): any {
    return AdInsHelper.GetCookie(cookieService, key);
  }

  private configure() {
    this.environment  = environment;
    this.envConfig    = envi;
    this.urlConstant  = URLConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
    this.navConstant = NavigationConstant
    this.baseUrl = window.location.origin; //envi.FoundationR3Web;
  }
}
