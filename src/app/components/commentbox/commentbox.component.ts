import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})

export class CommentboxComponent implements OnInit {
  @Input() comment: Comment;
  numbers: any = [];
  constructor() { }

  ngOnInit() {
    this.numbers = Array(this.comment.rating).fill(1);
  }

}
