import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapDahsboardComponent } from './components/map-dahsboard/map-dahsboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    MapDahsboardComponent,
    NavbarComponent,
    PlaceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbdu5ckmNoGn17bK-00enjTj84j_sywvY'
    }),
    AngularFontAwesomeModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
