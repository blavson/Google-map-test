import { Observable } from 'rxjs';
import { Place } from './../models/place';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {
  placeId: string;
  constructor(private http: HttpClient) {
  }

  public getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('http://localhost:3000/api/v1/places');
  }

  public addPlace(place: Place, image : File) {
     let placeData = new FormData();

     placeData.append('name',place.name);
     placeData.append('address',place.address);
     placeData.append('description', place.description);
     placeData.append('image', image, 'testfile.jpg');

     this.http.post('http://localhost:3000/api/v1/places', placeData).subscribe(result => {
        console.log(result);
//         const place:Place = result as Place;
   //      console.log("addPlace function in service " + place);
      });
  }
}
