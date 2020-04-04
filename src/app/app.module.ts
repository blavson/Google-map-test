import { AuthInterceptor } from './services/auth-interceptor';
import { PlacesServiceService } from './services/places-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapDahsboardComponent } from './components/map-dahsboard/map-dahsboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommentboxComponent } from './components/commentbox/commentbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StarRateComponent } from './components/star-rate/star-rate.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MergeMapAndCommentsComponent } from './components/merge-map-and-comments/merge-map-and-comments.component';
import {AddPlaceFormComponent}  from './components/add-place-form/add-place-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomPipe } from './custompipe';

@NgModule({
  declarations: [
    AppComponent,
    MapDahsboardComponent,
    NavbarComponent,
    PlaceListComponent,
    CommentboxComponent,
    StarRateComponent,
    PaginationComponent,
    MergeMapAndCommentsComponent,
    AddPlaceFormComponent,
    LoginComponent,
    SignupComponent,
    SearchbarComponent,
    CommentListComponent,
    FooterComponent,
    CustomPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBofbFTGwnVBYhjGG6tQvSHgjbz948d0qE'
    }),
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PlacesServiceService, {provide : HTTP_INTERCEPTORS , useClass : AuthInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
