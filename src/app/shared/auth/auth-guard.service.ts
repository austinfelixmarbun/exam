import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { AdInsConstant } from '../AdInstConstant';
import { AdInsHelper } from '../AdInsHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private previousUrl;
  private currentUrl;
  private jstoday;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = localStorage.getItem("UserContext");
    console.log("Router Interceptor" + route.url);
    console.log(route);
    console.log(state);

    let today = new Date();
    this.previousUrl = route.url;
    this.currentUrl = state.url;
    // this.jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');

    // var listPageAccess;
    // listPageAccess = JSON.parse(localStorage.getItem("PageAccess"));
    // var pageAccess;
    // if(listPageAccess==null)
    // {
    //   pageAccess = [];
    // }
    // else
    // {
    //   pageAccess = listPageAccess;
    // }
    // var pageAccessNow = {
    //   CurrentUrl: this.currentUrl,
    //   UrlAccessTime: this.jstoday,
    //   Type:"PAGE"
    // }
    // pageAccess.push(pageAccessNow);
    // localStorage.setItem('PageAccess', JSON.stringify(pageAccess));

    AdInsHelper.InsertLog(this.currentUrl,"PAGE");

    if (currentUser == null) {
      this.router.navigate(['pages/login'])
      return false;
    }
    else {
      return true;
    }
  }


}
