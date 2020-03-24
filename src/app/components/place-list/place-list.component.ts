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
export class PlaceListComponent  {
  
}
