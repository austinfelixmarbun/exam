import { Injectable } from '@angular/core';
import { AuthService } from '@adins/integration';
import { environment } from 'environments/environment';
import { URLConstant } from '../constant/URLConstant';

@Injectable({
  providedIn: 'root'
})
export class ConfinsAuthService extends AuthService {
  
  get config(): { [key: string]: any; } {
    const options = environment.oidc;
    const serviceUrl = URLConstant.env[options.issuer];
    return {...options, ...{serviceUrl: serviceUrl}};
  }
}
