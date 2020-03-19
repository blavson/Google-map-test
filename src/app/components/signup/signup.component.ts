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

  constructor(private auths : AuthService) { }

  ngOnInit() {
  }

  signupUser(f : NgForm) {
    if (f.invalid) 
      return;
      this.auths.createUser(f.value.email, f.value.password)
    }
  }
  