import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CustomPipe } from 'src/app/custompipe';

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
  }

}
