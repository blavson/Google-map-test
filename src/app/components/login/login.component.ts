import { Result } from './../../models/result';
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
    if (f.invalid)
      return;
    this.auths.loginUser(f.value.email, f.value.password);
  }

}
