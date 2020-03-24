import { MarkerService } from './../../services/marker.service';
import { CommentsService } from './../../services/comments.service';
import { Result } from './../../models/result';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

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
