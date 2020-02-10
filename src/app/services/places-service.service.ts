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

  public addPlace(place: Place) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(place);
    //this.http.post<Place>('http://localhost:3000/api/v1/places', place, httpOptions).subscribe(result=>result);
  }
}
