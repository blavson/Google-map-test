import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth : AuthService) {

  }

  intercept (req : HttpRequest<any>, next : HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authRequest = req.clone({
      setHeaders : {
        Authorization  : 'Bearer ' + authToken
      }
    })
    return next.handle(authRequest);
  }
}