import { PlacesServiceService } from './../../services/places-service.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { } from 'googlemaps';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-map-dahsboard',
  templateUrl: './map-dahsboard.component.html',
  styleUrls: ['./map-dahsboard.component.css']
})
export class MapDahsboardComponent implements OnInit, AfterViewInit {
  private places: Place[];
  private map: google.maps.Map;
  private marker: google.maps.Marker[] = [];
  private infowindow: google.maps.InfoWindow[] = [];

  @ViewChild('mapWrapper', { static: false }) mapElement: ElementRef;
  constructor(private ps: PlacesServiceService) { }

  ngAfterViewInit() {
    this.initGMap();
    this.getPlaces();
  }



  ngOnInit() { }

  getPlaces() {
    this.ps.getPlaces().subscribe(places => {
      this.places = places;
      let index = 0;
      for (const place of this.places['data']) {
        const markerPos = new google.maps.LatLng(
          place.location.coordinates[1],
          place.location.coordinates[0]
        );
        this.marker[index] = new google.maps.Marker({
          position: markerPos,
          map: this.map,
          title: place.name,
          icon: place.icon,
        });

        index++;

      }
    });
  }

  initGMap() {

    const lngLat = new google.maps.LatLng(41.692417, 44.803771);
    const contentString = `<h3>სათაური</h3>უბრალო ტექსტი`;

    const mapOptions: google.maps.MapOptions = {
      center: lngLat,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
