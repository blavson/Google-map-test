import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
user : User;
  constructor(private auths : AuthService) { }

  ngOnInit() {
    this.user = new User();
    
  }

  signupUser(v) {
   this.user.email = v.email;
   this.user.password = v.password;

    this.auths.signupUser(this.user);
  }
}
