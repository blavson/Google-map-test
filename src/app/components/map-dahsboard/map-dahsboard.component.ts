import { Component, OnInit , ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {} from 'googlemaps';

@Component({
  selector: 'app-map-dahsboard',
  templateUrl: './map-dahsboard.component.html',
  styleUrls: ['./map-dahsboard.component.css']
})
export class MapDahsboardComponent implements OnInit , AfterViewInit{
  @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;

  constructor() { }


  ngAfterViewInit() {   
    this.initGMap();
  }


  ngOnInit()  {
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
    const markerPos = new google.maps.LatLng(41.692232, 44.804472);
    const marker = new google.maps.Marker({
      position: markerPos,
      map: map,
      title: 'Hello World!',
      icon : 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
  });

  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  }

}
