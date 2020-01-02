import { Observable } from 'rxjs';
import { Place } from './../models/place';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {
  constructor(private http:HttpClient) {
   }

public getPlaces() : Observable<Place[]> {
  return this.http.get<Place[]>('http://localhost:3000/api/v1/places');
}

}