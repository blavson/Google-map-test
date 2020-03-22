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
  constructor(private ps: PlacesServiceService) { }

  ngAfterViewInit() {
    this.initGMap();
    this.getPlaces(this.map);
  }


  ngOnInit() { }

  emitMarkerId(id: string) {
    const page = 1;
    this.placeIdEmitter.emit({ id, page });
  }

   getPlaces(map) {
     this.ps.getPlaces().subscribe(result => {

     // console.log(result)
      console.log(result)
      this.places = result.data ;
      let index = 0;
      this.places.forEach(place =>  {
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
        // this.placeId = place._id;
        this.marker[index].setValues({ type: 'point', placeId: place._id });
        const contentString = place.infoWindow;
        const marker = this.marker[index];
        const iw = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', () => {
          const someid = marker.get('placeId');
          this.emitMarkerId(someid);
          iw.open(map, marker);
          // window.location.href=`/places/${someid}`;
        });

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', () => {
          iw.close();
        });

        index++;
      })
    });
  }

  initGMap() {

    const lngLat = new google.maps.LatLng(41.709157, 44.767054);

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
