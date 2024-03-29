import { MarkerService } from './../../services/marker.service';
import { Place } from './../../models/place';
import { PlacesServiceService } from './../../services/places-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
sphrase : string='';
places : Place[];
@Output() showPlaces: EventEmitter<boolean> = new EventEmitter();

  constructor(private pserv : PlacesServiceService, private ms : MarkerService) { }

  ngOnInit() {
  }

  onKeyUp() {
      if (this.sphrase === '') {
        this.fetchNearbyObjects();
         this.pserv.showPlaces.next(true);
         console.log('Showplaces = true');
      }
      else {
        this.pserv.showPlaces.next(false);
        this.fetchNearbyObjects(this.sphrase);  
      }
    }

  public fetchNearbyObjects(address : string = '') {
    this.pserv.getPlaces(address).subscribe(res => {
      const result = res;
      if (res.success) {
        this.places = res.data;
      }
      const ul = document.getElementById('placeArray');
      ul.innerHTML='';
      ul.hidden=false;
  
      this.places.forEach(place => {
        let li = document.createElement('li'); 
        li.appendChild(document.createTextNode(place.address ));
        li.setAttribute('href', '#')
        li.setAttribute('class','list-group-item list-group-item-action list-group-item-secondary bg-dark text-light');
        ul.appendChild(li);
      })
      ul.removeAttribute('display')
    })    
  }  


  getTestRequest() {
    this.pserv.getTestRequest();
  }


  onFocus() {
    if (this.sphrase !=='')
      return;
      this.pserv.showPlaces.next(true);
      console.log('Showplaces = true');
    this.fetchNearbyObjects();
  } 

  onFocusOut(event ) {
    let placeName =undefined
    const placeObject =event.explicitOriginalTarget

    if (placeObject.className === 'list-group-item list-group-item-action list-group-item-secondary bg-dark text-light') {
      console.log(placeObject)
      placeName = placeObject.innerText;
      console.log('placename = ', placeName)
      const desiredPlace = this.pserv.getPlaces(placeName).subscribe(result => {

        
        this.ms.simulateClick(result.data[0]._id)  
        console.log(result.data[0]._id);

      })
      this.pserv.showPlaces.next(false);
    }
    if (placeName !== undefined) {
      this.sphrase = placeName
    }
    const ul = document.getElementById('placeArray');
    ul.hidden=true;
  } 

}
