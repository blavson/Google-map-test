import { Router } from '@angular/router';
import { Result } from './../models/result';
import { Observable, Subject } from 'rxjs';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token : string;
private isAuthenticated = false;
private authStatusListener =  new Subject<boolean>()

  constructor(private http : HttpClient, private router:Router) { }

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
   return this.http.post('http://localhost:3000/api/v1/users/signup', user).subscribe(result => {
     console.log('create user');
   })
  }

  loginUser(email : string, password : string) {
    const user : User = {email, password}
      this.http.post<any>('http://localhost:3000/api/v1/users/login',user).subscribe(result => {
        if (result.success) {
          if (result.token) {
              this.isAuthenticated = true;
              this.token = result.token;
              this.authStatusListener.next(this.isAuthenticated);
              localStorage.setItem('token', result.token);
              localStorage.setItem('isAuthenticated', '1');
              this.router.navigate(['/']);
          }
        }
      })
    }

  logoutUser() {
    console.log('logout clicked');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }  
}