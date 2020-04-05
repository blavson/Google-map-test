import { Component, OnInit,  Input } from '@angular/core';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.css']
})
export class PlaceInfoComponent implements OnInit {
  @Input() place : Place;

  constructor() { }

  ngOnInit() {
  }

}
