import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = localStorage.getItem("UserContext");
    if (currentUser == null) {
      this.router.navigate(['pages/login'])
      return false;
    }
    else {
      return true;
    }
    // return this.user.isLoggedIn().pipe(map(res => {
    //   if (res.status) {
    //     this.authService.setLoggedIn(true)
    //     return true
    //   } else {
    //     this.router.navigate(['pages/login'])
    //     return false
    //   }
    // }))
    // return this.authService.isLoggedIn();
  }
}
