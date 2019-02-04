import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private user: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn) {
      return true
    }
    return this.user.isLoggedIn().pipe(map(res =>{
      if (res.status) {
        this.authService.setLoggedIn(true)
        this.router.navigate(['dashboard/dashboard2'])
        return true
      }else{
        return true
      }
    }))
    // return this.authService.isLoggedIn();
  }
}
