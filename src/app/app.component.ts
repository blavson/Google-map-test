import { Component } from '@angular/core';
import { PlacesServiceService } from './services/places-service.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gmap-test';

  constructor() { }

}


