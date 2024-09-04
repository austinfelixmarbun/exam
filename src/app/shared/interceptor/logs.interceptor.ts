import { Injectable } from '@angular/core';
import { LoggingInterceptor, LoggingService } from '@adins/fe-core';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from '../AdInsHelper';

@Injectable()
export class LogsInterceptor extends LoggingInterceptor {

  protected paths: string[] = [
    '/api/fou/v1/Authenticate/Login',
    '/api/fou/v2/Authenticate/Login',
    '/api/fou/v3/Authenticate/Login'
  ];

  constructor(logging: LoggingService, private readonly cookieService: CookieService) {
    super(logging);
  }

  get identity(): any {
    return AdInsHelper.GetUserAccess(this.cookieService);
  }
}
