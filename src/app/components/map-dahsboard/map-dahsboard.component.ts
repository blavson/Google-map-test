import { MarkerService } from './../../services/marker.service';
import { PlacesServiceService } from './../../services/places-service.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output
} from '@angular/core';

import * as $ from 'jquery';
import { } from 'googlemaps';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-map-dahsboard',
  styleUrls: ['./map-dahsboard.component.css'],
  templateUrl: './map-dahsboard.component.html'
})

export class MapDahsboardComponent implements OnInit, AfterViewInit {
  private map: google.maps.Map;
  @ViewChild('mapWrapper', { static: false }) mapElement: ElementRef;
  constructor(private ps: PlacesServiceService,private  ms : MarkerService) { }

  ngAfterViewInit() {
   this.ms.initGMap(this.map, this.mapElement.nativeElement )
  }


  ngOnInit() { }

}
