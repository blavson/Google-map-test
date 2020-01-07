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
    google.maps.event.addListener(infowindow, 'domready', () => {
      console.log('Added Listener');
      // Reference to the DIV that wraps the bottom of infowindow
      const iwOuter = $('.gm-style-iw');

      /* Since this div is in a position prior to .gm-div style-iw.
       * We use jQuery and create a iwBackground constiable,
       * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
      */
      const iwBackground = iwOuter.prev();

      // Removes background shadow DIV
      iwBackground.children(':nth-child(2)').css({ display: 'none' });

      // Removes white background DIV
      iwBackground.children(':nth-child(4)').css({ display: 'none' });

      // Moves the infowindow 115px to the right.
      iwOuter.parent().parent().css({ left: '115px' });

      // Moves the shadow of the arrow 76px to the left margin.
      iwBackground.children(':nth-child(1)').attr('style', (i, s) => { return s + 'left: 76px !important;' });

      // Moves the arrow 76px to the left margin.
      iwBackground.children(':nth-child(3)').attr('style', (i, s) => { return s + 'left: 76px !important;' });

      // Changes the desired tail shadow color.
      // tslint:disable-next-line: max-line-length
      iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

      // Reference to the div that groups the close button elements.
      const iwCloseBtn = iwOuter.next();

      // Apply the desired effect to the close button
      // tslint:disable-next-line: max-line-length
      iwCloseBtn.css({ opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });

      // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
      if ($('.iw-content').height() < 140) {
        $('.iw-bottom-gradient').css({ display: 'none' });
      }

      // tslint:disable-next-line: max-line-length
      // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
      iwCloseBtn.mouseout(() => {
        $(this).css({ opacity: '1' });
      });
    });

    google.maps.event.addDomListener(window, 'load', this.initGMap);
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
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
