import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';

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
    if (this.collectionSize < 6)
      this.noNext = true;
    else
       this.noNext = false;  
    console.log('m_id = ', this.m_id);
  }

  onPageClick(event) {
      this.currentPage = parseInt(event.target.text);
      this.pageNumba.emit(this.currentPage);
  }

  getPrevious() {
    if (this.currentPage >= 1) {
      this.currentPage--;
      this.noPrevious = false;
    }
    else
      this.noPrevious = true;  
    if (this.noPrevious)
      return;
      const someObj : any = {
        m_id : this.m_id,
        currentPage : this.currentPage
      };  
      this.pageNumba.emit(someObj);  
    console.log("Get previous");
  }

  getNext() {
    if (this.noNext)
      return;
    this.currentPage++;
    if (this.currentPage > 0) 
     this.noPrevious = false;
    else
      this.noPrevious = true;
    if (this.currentPage >= Math.floor(this.collectionSize/ 6))
      this.noNext = true;
    else
      this.noNext = false;    
    const someObj : any = {
      m_id : this.m_id,
      currentPage : this.currentPage
    };
    this.pageNumba.emit(someObj);  
  }


}
