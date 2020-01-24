import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceListComponent } from './components/place-list/place-list.component';
import {MergeMapAndCommentsComponent } from './components/merge-map-and-comments/merge-map-and-comments.component';
import { AddPlaceFormComponent } from './components/add-place-form/add-place-form.component';
const routes: Routes = [
    {path : '' , component : MergeMapAndCommentsComponent},
    {path : 'addPlace', component : AddPlaceFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
