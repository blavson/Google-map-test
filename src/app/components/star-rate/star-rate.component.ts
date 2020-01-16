import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.css'],
  providers: [NgbRatingConfig]
})
export class StarRateComponent implements OnInit {

  constructor(private config  : NgbRatingConfig) {
      config.max = 5;
      config.readonly = false;
  }

  ngOnInit() {
  }

}
