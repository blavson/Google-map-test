import { PlacesServiceService } from './../../services/places-service.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
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

  constructor(private ps: PlacesServiceService) { }

  ngAfterViewInit() {
    this.initGMap();
    this.getPlaces();
    this.listen2Listeners();
  }


  ngOnInit() { }

  listen2Listeners() {
    // *
    const map = this.map;

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(41.693768, 44.802970),
      map,
    });

    marker.setValues({ type: 'string', id: 77777 });
    console.log(marker);
    const contentString = '<div id="iw-container">' +
      '<div class="iw-title">Porcelain Factory of Vista Alegre</div>' +
      '<div class="iw-content">' +
      '<div class="iw-subTitle">History</div>' +
      '<img src="http://lorempixel.com/83/115/food" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
      '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' +
      '<div class="iw-subTitle">Contacts</div>' +
      '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>' +
      '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>' +
      '</div>' +
      '<div class="iw-bottom-gradient"></div>' +
      '</div>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });


    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });

    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', () => {
      infowindow.close();
    });
  }

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
          icon: place.icon
        });

        const contentString = '<div id="iw-container">' +
          '<div class="iw-title">Porcelain Factory of Vista Alegre</div>' +
          '<div class="iw-content">' +
          '<div class="iw-subTitle">History</div>' +
          '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
          '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' +
          '<div class="iw-subTitle">Contacts</div>' +
          '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>' +
          '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>' +
          '</div>' +
          '<div class="iw-bottom-gradient"></div>' +
          '</div>';

        const marker = this.marker[index];
        const iw = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', () => {
          iw.open(map, marker);
          console.log(marker);
        });

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', () => {
          iw.close();
        });
        /*
                marker.addListener('click', () => {
                  iw.open(map, marker);
                });
         */
        index++;
      }
    });
  }

  initGMap() {

    const lngLat = new google.maps.LatLng(41.692417, 44.803771);

    const mapOptions: google.maps.MapOptions = {
      center: lngLat,
      zoom: 16,
      // fullscreenControl: false,
      // mapTypeControl: false,
      // streetViewControl: false,
      // zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
