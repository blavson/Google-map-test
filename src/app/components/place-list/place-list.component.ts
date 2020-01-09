import { Component, OnInit, Input } from '@angular/core';
import { PlacesServiceService } from 'src/app/services/places-service.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  markerId: string;
  constructor(ps: PlacesServiceService) { }

  ngOnInit() {
  }

  public receiveId(id: string) {
    this.markerId = id;
    console.log("ID received " + id);
  }


}
