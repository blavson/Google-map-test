import { Observable } from 'rxjs';
import { Place } from './../models/place';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {
  placeId: string;
  constructor(private http: HttpClient) {
  }

  public getPlaces(placeAddress : string=''): Observable<{success : boolean, count : number, data : Place[]}> {
    const params = new HttpParams().append('address', placeAddress);
    return this.http.get<{success : boolean, 
                          count : number, 
                          data : Place[]}>('http://localhost:3000/api/v1/places', {params : params});

  }


  public addPlace(place: Place, image : File) {
     let placeData = new FormData();

     placeData.append('name',place.name);
     placeData.append('address',place.address);
     placeData.append('description', place.description);
     placeData.append('icon', place.icon)
   //  placeData.append('infoWindow', place.infoWindow)
    if (image !== null)
       placeData.append('myimage', image, image.name);

     this.http.post('http://localhost:3000/api/v1/places', placeData).subscribe(result => {
        console.log(result);
//         const place:Place = result as Place;
   //      console.log("addPlace function in service " + place);
      });
  }

  public getTestRequest() {
    this.http.get('http://localhost:3000/api/v1/places/test').subscribe(result =>{
      console.log(result);
    })
  }
}
