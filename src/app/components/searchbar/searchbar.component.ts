import { Place } from './../../models/place';
import { PlacesServiceService } from './../../services/places-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
sphrase : string='';
places : Place[];

  constructor(private pserv : PlacesServiceService) { }

  ngOnInit() {
  }

  onKeyUp() {
      if (this.sphrase === '')
        this.fetchNearbyObjects();
      else
      this.fetchNearbyObjects(this.sphrase);  
    }

  fetchNearbyObjects(address : string = '') {
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
        li.setAttribute('class','list-group-item list-group-item-action list-group-item-secondary');
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
    this.fetchNearbyObjects();
  } 

  onFocusOut(event ) {
    let placeName =undefined
    const placeObject =event.explicitOriginalTarget

    if (placeObject.className === 'list-group-item list-group-item-action list-group-item-secondary') {
      console.log(placeObject)
      placeName = placeObject.innerText;
      console.log('placename = ', placeName)
      const desiredPlace = this.pserv.getPlaces(placeName).subscribe(result => {

        console.log(result.data);
      })
    }
    if (placeName !== undefined) {
      this.sphrase = placeName
    }
    const ul = document.getElementById('placeArray');
    ul.hidden=true;
  } 

  lockOnItem($event) {
    console.log('lockon')
  }
}
