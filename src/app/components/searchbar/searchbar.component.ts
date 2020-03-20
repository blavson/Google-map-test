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
      console.log(this.sphrase);
    }
//{success : boolean, count : number, data : Place[]}s
  onFocus() {
    if (this.sphrase.length > 0)
      return;
    this.pserv.getPlaces().subscribe(res => {
    const result = res;
    if (res.success) {
      this.places = res.data;
    }
    const ul = document.getElementById('placeArray');
    ul.innerHTML='';
    ul.hidden=false;

    this.places.forEach(place => {
      let li = document.createElement('li'); 
      li.appendChild(document.createTextNode(place.name + '(' + place.address + ')' ));
      li.setAttribute('href', '#')
      li.setAttribute('class','list-group-item list-group-item-action list-group-item-secondary');
      ul.appendChild(li);
    })
    ul.removeAttribute('display')
    console.log(this.places);
  })    
  } 

  onFocusOut(event ) {
    let placeName =undefined
    const placeObject =event.explicitOriginalTarget

    if (placeObject.className === 'list-group-item list-group-item-action list-group-item-secondary') {
      console.log(placeObject)
      placeName = placeObject.innerText;
      console.log('placename = ', placeName)
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
