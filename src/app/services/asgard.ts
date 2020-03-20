import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Asgard  implements CanActivate{

  constructor(private auth : AuthService, private router : Router) {}

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    let isAuth = false;
     if(localStorage.getItem('isAuthenticated'))
      isAuth = true;
    console.log('Asgard isAuth :' + isAuth);
    if (isAuth === false) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

}