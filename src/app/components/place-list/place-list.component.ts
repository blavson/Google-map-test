import { MarkerService } from './../../services/marker.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { Result } from 'src/app/models/result';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StarRateComponent} from 'src/app/components/star-rate/star-rate.component';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  markerId: string;
  result : Result ;
  page : number;
  collectionSize : number;
  pageSize : number;

  constructor(private cs: CommentsService, private ms : MarkerService) { }

  ngOnInit() {
      this.result = new Result();
      this.getClickedPlace();
  }

  public receiveId(event) {
      console.log(event);
    this.markerId = event.id;
    this.page = event.page;
    this.cs.getComments(event.id,event.page).subscribe(res => {
        this.result = res ;
        this.collectionSize = res.count;
        console.log("Col size " +  this.collectionSize);
    })
  }

  getClickedPlace() {
    this.ms.clickSubj.subscribe(_id => {
      this.cs.getComments(_id,1).subscribe(res => {
        this.result = res ;
        this.collectionSize = res.count;
        console.log("Col size " +  this.collectionSize);
    })   
    })
  }
  onPageChange(event) {
     this.page = event;
     console.log("event = " + event);
    this.cs.getComments(this.markerId, this.page).subscribe(res => {
        this.result = res;
    })

//    console.log(this.markerId, this.page);
  }

}
