import { PlacesServiceService } from 'src/app/services/places-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merge-map-and-comments',
  templateUrl: './merge-map-and-comments.component.html',
  styleUrls: ['./merge-map-and-comments.component.css']
})
export class MergeMapAndCommentsComponent implements OnInit {
  showPlaces = true;
  constructor(private ps : PlacesServiceService) { }

  ngOnInit() {
    this.showPlaces = true;
    this.ps.showPlaces.subscribe(result => {
      console.log('Merge map ', result)
      this.showPlaces = result;
    })
  }

}
