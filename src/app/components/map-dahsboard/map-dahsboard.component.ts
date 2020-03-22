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
  private places: Place[];
  private map: google.maps.Map;
  private marker: google.maps.Marker[] = [];
  private infowindow: google.maps.InfoWindow[] = [];
  private placeId: string;
  @ViewChild('mapWrapper', { static: false }) mapElement: ElementRef;
  @Output() placeIdEmitter = new EventEmitter();
  constructor(private ps: PlacesServiceService,private  ms : MarkerService) { }

  ngAfterViewInit() {
   this.ms.initGMap(this.map, this.mapElement.nativeElement )
  }


  ngOnInit() { }

  emitMarkerId(id: string) {
    const page = 1;
    this.placeIdEmitter.emit({ id, page });
  }
}
