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

  signupUser(user : User ) {
   return this.http.post('http://localhost:3000/api/v1/users/signup', user).subscribe(result => {
   })
  }

  loginUser(email : string, password : string) : Observable<any>{
      return this.http.post<any>('http://localhost:3000/api/v1/users/login',{ email, password });
    }
}