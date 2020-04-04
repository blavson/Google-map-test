import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Output() pageNumba: EventEmitter<any> = new EventEmitter();
    @Input() collectionSize : number;
    @Input() m_id : string;
    noPrevious : boolean;
    noNext : boolean;
    currentPage : number;
  constructor() { }

  ngOnInit() {
    this.currentPage = 0;
    this.noPrevious = true;
    if (this.collectionSize < 6) {
      this.noNext = true;
      this.noPrevious = true;
    }
    else {
       this.noNext = false;  
    }
    console.log('collectionsize = ', Math.floor(this.collectionSize / 6) -1 );
  }

  onPageClick(event) {
      this.currentPage = parseInt(event.target.text);
      this.pageNumba.emit(this.currentPage);
  }

  getPrevious() {

    this.doPageLogic();
    this.currentPage--;

      const someObj : any = {
        m_id : this.m_id,
        currentPage : this.currentPage
      };  
      this.pageNumba.emit(someObj);  
    console.log("Get previous");
  }

  getNext() {

    this.doPageLogic();  
    this.currentPage++;  
    const someObj : any = {
      m_id : this.m_id,
      currentPage : this.currentPage
    };
    this.pageNumba.emit(someObj);  
  }

  doPageLogic() {
    if (this.currentPage > 1)
       this.noPrevious = false;
    else
      this.noPrevious = true;
    
    if (this.currentPage <= (this.collectionSize / 6))  
      this.noNext = false;
    else this.noNext = true;  
  }

}
