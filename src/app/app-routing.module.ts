import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceListComponent } from './components/place-list/place-list.component';


const routes: Routes = [
    //{ path : 'places/:id' , component : PlaceListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
