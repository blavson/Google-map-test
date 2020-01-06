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
    const map = this.map;
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
          map,
          title: place.name,
          icon: place.icon });

          const contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>' ;
  
        const marker =   this.marker[index];

     const iw =  new google.maps.InfoWindow({
      content:  place.location.formattedAddress
    });
  

        marker.addListener('click', () => {
          iw.open(map, marker);
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
