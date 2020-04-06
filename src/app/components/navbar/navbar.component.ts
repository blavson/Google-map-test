import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
private authListenerSubs : Subscription;
public userIsAuthenticated = false ;
private ttl :any ;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    const isAuth  =localStorage.getItem('isAuthenticated');
    this.ttl = localStorage.getItem('tokenTimer')
    if (this.ttl) {
      const tokenTimer = setTimeout(()=> {
        this.onLogout();
      }, this.ttl );

    }
    if (isAuth)
      this.userIsAuthenticated  = true;
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
  }

   ngOnDestroy() {
      this.authListenerSubs.unsubscribe();
   }

   onLogout() {
     this.auth.logoutUser();
   }

}
