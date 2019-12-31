import { of } from 'rxjs';
import { PlacesServiceService } from './../../services/places-service.service';
import { Component, OnInit , ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {} from 'googlemaps';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-map-dahsboard',
  templateUrl: './map-dahsboard.component.html',
  styleUrls: ['./map-dahsboard.component.css']
})
export class MapDahsboardComponent implements OnInit , AfterViewInit{
  @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;
  private places : Place[];
  constructor(private ps : PlacesServiceService) { }


  ngAfterViewInit() {   
    this.initGMap();
  }


  ngOnInit()  {                                                                                                                   
    this.getPlaces();
  }

  getPlaces() {
     this.ps.getPlaces().subscribe(places => {
      this.places  = places;
    });
  }

  initGMap() {
    const lngLat = new google.maps.LatLng(
      41.692417, 44.803771);
      const contentString = `<h3>სათაური</h3>უბრალო ტექსტი`;

    const mapOptions: google.maps.MapOptions = {
      center: lngLat,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl : false
    };

    

    const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    
    let marker :google.maps.Marker[];
    

    this.places.forEach( function(place, index) {
      
      const markerPos = new google.maps.LatLng(place.position.latitude, place.position.longitude);
      marker[index] = new  google.maps.Marker({
          position : markerPos,
          map: map,
          title: place.name,
          icon : place.icon
    });

    marker[index].addListener('click', function() {
      infowindow.open(map, marker[index]);
    });
  

  const infowindow = new google.maps.InfoWindow({
    content: place.description
  });


  });
}

}