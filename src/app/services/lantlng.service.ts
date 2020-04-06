import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LantlngService {
  public lngLat = new google.maps.LatLng(41.709157, 44.767054);

  constructor() { }

}
