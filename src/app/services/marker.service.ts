import { PlacesServiceService } from 'src/app/services/places-service.service';
import { Injectable, OnInit } from '@angular/core';
import { Place } from '../models/place';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService implements OnInit {
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private places : Place[];
  public  clickSubj = new Subject<string>();
  public lngLat = new google.maps.LatLng(41.709157, 44.767054);

  constructor(private ps : PlacesServiceService) { }
  ngOnInit() {}

  getPlaces() {
    return this.ps.getPlaces();
  }


  public Helloworld() {
    console.log("Hello World");
  }

  public initGMap(map: google.maps.Map, htmle : HTMLElement) {
    this.map = map;
    

    const mapOptions: google.maps.MapOptions = {
      center: this.lngLat,
      zoom: 16,
      // fullscreenControl: false,
      // mapTypeControl: false,
      // streetViewControl: false,
      // zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(htmle, mapOptions);
    this.initMarkers();
  }
  
  simulateClick(_id : string) {
    this.markers.forEach(marker => {
      if (_id === marker.get('placeId')) {
        google.maps.event.trigger(marker, 'click');
        this.clickSubj.next(_id);
        };
    })
  }

  private initMarkers() {
    const map = this.map
    
      this.getPlaces().subscribe(data => {
        this.places = data.data;

        let index = 0;
        this.places.forEach(place =>  {
          const markerPos = new google.maps.LatLng(
            place.location.coordinates[1],
            place.location.coordinates[0]
          );

          this.markers[index] = new google.maps.Marker({
            position: markerPos,
            map,
            title: place.name,
            icon: place.icon
          });
          // this.placeId = place._id;
          const marker = this.markers[index];
          marker.setValues({ type: 'point', placeId: place._id });
          const contentString = place.infoWindow;
          const iw = new google.maps.InfoWindow({
            content: contentString
          });
  
          google.maps.event.addListener(marker, 'click', () => {
            const someid = marker.get('placeId');
           // this.emitMarkerId(someid);
           this.ps.showPlaces.next(false);
           this.clickSubj.next(someid);

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


}