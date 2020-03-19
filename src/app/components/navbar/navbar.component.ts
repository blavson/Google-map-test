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
private userIsAuthenticated = false ;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    const isAuth  =localStorage.getItem('isAuthenticated');
    if (isAuth)
      this.userIsAuthenticated  = true;
    console.log('Navbar ngoninit : ' + this.userIsAuthenticated );
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
