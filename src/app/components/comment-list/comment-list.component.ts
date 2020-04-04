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
  currentPage : number;
  collectionSize : number;
  perPage : number;

  constructor(private cs: CommentsService, private ms : MarkerService) { }

  ngOnInit() {
      this.result = new Result();
      this.currentPage=0;
      this.getClickedPlace();
  }

  public receiveId(event) {
      console.log(event);
    this.markerId = event.id;
    this.currentPage = event.page;
    this.cs.getComments(event.id,event.page).subscribe(res => {
        this.result = res ;
        this.collectionSize = res.count;
        console.log("Col size " +  this.collectionSize);
    })
  }

  getClickedPlace() {
    this.ms.clickSubj.subscribe(_id => {
      this.markerId = _id;
      this.cs.getComments(_id,1).subscribe(res => {
        this.result = res ;
        this.collectionSize = res.count;
        console.log("Col size " +  this.collectionSize);
    })   
    })
  }

  getComments(event) {
     this.currentPage = event.currentPage;
     this.markerId = event.m_id;
     console.log("getComments = " + event, this.markerId);
     this.cs.getComments(this.markerId, this.currentPage).subscribe(res => {
        this.result = res;
    })

//    console.log(this.markerId, this.page);
  }

}
