import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private previousUrl;
  private currentUrl;
  private jstoday;

  constructor(private authService: AuthService, private router: Router,public errorDialogService: ErrorDialogService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = localStorage.getItem("UserContext");
    console.log("Router Interceptor" + route.url);
    //console.log(route);
    //console.log(state);

    let today = new Date();
    this.previousUrl = route.url;
    this.currentUrl = state.url;

    AdInsHelper.InsertLog(this.currentUrl,"PAGE");

    if(!AdInsHelper.IsGrantAccess(this.currentUrl))
    {
      // this.errorDialogService.openDialog(AdInsErrorMessage.PageNotAuthorized);
      // this.router.navigate([AdInsConstant.FormDefault]);
    }

    if (currentUser == null) {
      this.router.navigate(['pages/login'])
      return false;
    }
    else {
      return true;
    }
  }


}
