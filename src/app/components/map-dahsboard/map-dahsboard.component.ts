import { Component, OnInit , ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-map-dahsboard',
  templateUrl: './map-dahsboard.component.html',
  styleUrls: ['./map-dahsboard.component.css']
})
export class MapDahsboardComponent implements OnInit , AfterViewInit{
  map: google.maps.Map;
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
    const mapOptions: google.maps.MapOptions = {
      center: lngLat,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl : false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    
  }

}
