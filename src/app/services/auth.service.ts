import { Result } from './../models/result';
import { Observable } from 'rxjs';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }


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
          localStorage.setItem('token', result.token);
          console.log('AuthService.loginuser : ', result.token);
        }
      })
    }
}