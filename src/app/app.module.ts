import { PlacesServiceService } from './services/places-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapDahsboardComponent } from './components/map-dahsboard/map-dahsboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { CommentboxComponent } from './components/commentbox/commentbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentsNavbarComponent } from './components/comments-navbar/comments-navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StarRateComponent } from './components/star-rate/star-rate.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    MapDahsboardComponent,
    NavbarComponent,
    PlaceListComponent,
    CommentboxComponent,
    CommentsNavbarComponent,
    StarRateComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbdu5ckmNoGn17bK-00enjTj84j_sywvY'
    }),
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [PlacesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
