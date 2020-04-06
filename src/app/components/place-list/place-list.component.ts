import { MarkerService } from './../../services/marker.service';
import { PlacesServiceService } from 'src/app/services/places-service.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent  implements OnInit{
private places : Place[];
  constructor(private ps : PlacesServiceService, private ms : MarkerService) {}

  ngOnInit() {
    this.getPlaces();
    this.updateList();
  }

  getPlaces() {
    this.ps.getPlaces().subscribe(result => {
      if (result.success) {
        this.places = result.data;
        console.log('place list :', this.places);
      }
      else {
        throw Error('nothing compares to you')
      }
    })
  }

  updateList() {
    this.ms.updatePlaceList.subscribe(obs => {
       this.getPlaces();
      })

  }
  
}
