import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { Result } from 'src/app/models/result';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  markerId: string;
  result : Result ;
  fill : number;
  currentRate : number;
  page : number;
  pageSize : number;
  collectionSize : number;
  
  constructor(private cs: CommentsService) { }

  ngOnInit() {
      this.result = new Result();
      this.fill = 5;
      this.currentRate = 2;
      this.page =1;
      this.pageSize =9;
      this.collectionSize = this.result.count;
  }

  public receiveId(id: string) {
    this.markerId = id;
    this.cs.getComments(id).subscribe(res => {
        this.result = res ;
        console.log(this.result);
    })
  }

  onPagingClick(event) {
    console.log(event.target);
  }

}
