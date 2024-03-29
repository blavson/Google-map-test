import { MarkerService } from './marker.service';
import { Observable, Subject } from 'rxjs';
import { Place } from './../models/place';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { LantlngService } from './lantlng.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {
  placeId: string;
  public showPlaces = new Subject<boolean>();
  constructor(private http: HttpClient, private lls : LantlngService) {
  }

  public getPlaces(placeAddress : string=''): Observable<{success : boolean, count : number, data : Place[]}> {
    const params = new HttpParams().append('address', placeAddress)
                .append('lng',this.lls.lngLat.lng().toString())
                .append('lat',this.lls.lngLat.lat().toString() );
    return this.http.get<{success : boolean, 
                          count : number, 
                          data : Place[]}>('/api/v1/places', {params : params});

  }
/*
  public getLocalPlaces(): Observable<{success : boolean, count : number, data : Place[]}>  {
    return this.http.get<{success : boolean, 
      count : number, 
      data : Place[]}>('/api/v1/places');
  }
*/
  public addPlace(place: Place, image : File) {
     let placeData = new FormData();

     placeData.append('name',place.name);
     placeData.append('address',place.address);
     placeData.append('description', place.description);
     placeData.append('icon', place.icon)
   //  placeData.append('infoWindow', place.infoWindow)
    if (image !== null)
       placeData.append('myimage', image, image.name);

     this.http.post('/api/v1/places', placeData).subscribe(result => {
        console.log(result);
//         const place:Place = result as Place;
   //      console.log("addPlace function in service " + place);
      });
  }

  public getTestRequest() {
    this.http.get('/api/v1/places/test').subscribe(result =>{
      console.log(result);
    })
  }
}
