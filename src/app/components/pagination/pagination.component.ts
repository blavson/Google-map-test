import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Output() pageNumba: EventEmitter<any> = new EventEmitter();
    @Input() collectionSize : number;
    @Input() page : number;
    @Input() pageSize : number;
  constructor() { }

  ngOnInit() {

  }

  onPageClick(event) {
      this.page = parseInt(event.target.text);
      this.pageNumba.emit(this.page);
  }


}
