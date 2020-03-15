import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MergeMapAndCommentsComponent } from './components/merge-map-and-comments/merge-map-and-comments.component';
import { AddPlaceFormComponent } from './components/add-place-form/add-place-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {path : '' , component : MergeMapAndCommentsComponent},
    {path : 'addPlace', component : AddPlaceFormComponent },
    {path : 'login', component : LoginComponent},
    {path : 'signup' , component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
