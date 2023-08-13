<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {UcTemplateService} from '@adins/uctemplate';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';

import * as env from "assets/config/enviConfig.json";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { UrlConstantNew } from '../constant/URLConstantNew';
import * as Module from '../../form-template';
import { NavigationConstant } from '../NavigationConstant';

const listEnvironments = [
  { environment: 'FOU', url: environment.FoundationR3Url },
  { environment: 'FOUR3WEB', url: environment.FoundationR3Web },
  { environment: 'LOSR3WEB', url: environment.losR3Web },
  { environment: 'LOS', url: environment.LosURL },
=======
import { Injectable } from '@angular/core';
import {UcTemplateService} from '@adins/uctemplate';
import {AdInsHelper} from '../AdInsHelper';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';
import {URLConstant, envi} from '../constant/URLConstant';
import * as Module from 'app/components';
import { NavigationConstant } from '../NavigationConstant';

const listEnvironments = [
    { environment: 'FOU', url: envi.FoundationR3Url},
    { environment: 'FOU_WEB', url: envi.FoundationR3Web },
    { environment: 'LOSR3WEB', url: envi.losR3Web },
    { environment: 'LMSR3WEB', url: envi.lmsR3Web },
    { environment: 'LOS', url: envi.LosURL },
    { environment: 'CashBankUrl', url: envi.CashBankUrl }
>>>>>>> host-mfe-lms
];

@Injectable({
  providedIn: 'root'
})
export class AdinsTemplateService extends UcTemplateService {

<<<<<<< HEAD
  constructor(private UrlConstant: UrlConstantNew) {
    super();
    this.UrlConstant = UrlConstant;
=======
  constructor() {
    super();

>>>>>>> host-mfe-lms
    this.configure();
  }

  getCookie(cookieService: CookieService, key: string): any {
    return AdInsHelper.GetCookie(cookieService, key);
  }

  private configure() {
    this.environment  = environment;
<<<<<<< HEAD
    this.envConfig    = env;
    this.urlConstant  = this.UrlConstant;
    this.navConstant  = NavigationConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
=======
    this.envConfig    = envi;
    this.urlConstant  = URLConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
    this.navConstant = NavigationConstant
>>>>>>> host-mfe-lms
  }
}
