import { PlacesServiceService } from './../../services/places-service.service';
import { User } from './../../models/User';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auths : AuthService) { 
  }
  
  ngOnInit() {
  }
  
  loginUser(f : NgForm) {
    const email = f.controls['email'].value;
    const password = f.controls['password'].value;
    this.auths.loginUser(email, password);
  }  
}
