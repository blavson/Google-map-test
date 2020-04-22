import { Router } from '@angular/router';
import { Result } from './../models/result';
import { Observable, Subject } from 'rxjs';
import { User } from './../models/User';
import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
private token : string;
private tokenTimer : any;
private isAuthenticated = false;
private authStatusListener =  new Subject<boolean>()

  constructor(private http : HttpClient, private router:Router) {
    console.log('Auth constructor')
   }


  getToken() : string {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated; 
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  createUser(email : string, password : string ) {
    const user : User ={ email,password};
   return this.http.post('/api/v1/users/signup', user).subscribe(result => {
     console.log('create user');
   })
  }

  async loginUser (email : string, password : string) {
    const user : User = {email, password}
      await this.http.post<any>('/api/v1/users/login',user).subscribe(result => {
        if (result.success) {
          if (result.token) {
              console.log('Expires in ' + result.expiresIn)
               const tokenTimer = setTimeout(()=> {
                 this.logoutUser();
               }, result.expiresIn * 1000);
              
              this.isAuthenticated = true;
              this.token = result.token;

              this.authStatusListener.next(this.isAuthenticated);
              this.saveCredentials(this.token, '1', result.expiresIn*  1000);
              this.router.navigate(['/']);
         }
      }
  });
}

  logoutUser() {
    console.log('logout clicked');
    this.removeCredentials();
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }  

  saveCredentials(token : string, status : string, tokenTimer : any) {
    localStorage.setItem('token',token);
    localStorage.setItem('isAuthenticated', status);
    localStorage.setItem('tokenTimer', tokenTimer);
  }

  removeCredentials() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimer');
    clearTimeout(this.tokenTimer);
  }
}