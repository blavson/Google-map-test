import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  markerId: string;
  comments: Comment[];
  constructor(private cs: CommentsService) { }

  ngOnInit() {
  }

  public receiveId(id: string) {
    this.markerId = id;
    this.cs.getComments(id).subscribe(comments => {
      this.comments = comments;
      console.log(this.comments);
    })
  }


}
