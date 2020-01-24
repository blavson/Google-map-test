import { Component, OnInit } from '@angular/core';
import { NgForm , NgModel} from '@angular/forms';
import { Place } from 'src/app/models/place';
import {PlacesServiceService} from 'src/app/services/places-service.service';

@Component({
  selector: 'app-add-place-form',
  templateUrl: './add-place-form.component.html',
  styleUrls: ['./add-place-form.component.css']
})
export class AddPlaceFormComponent implements OnInit {

   place : Place = {
     name : '',
     address :'',
     description : '',
     infoWindow : ''
}

  constructor(private ps : PlacesServiceService) {
}

  ngOnInit() {
     this.place.name='Subway';
     this.place.address = 'Chavchavadze avenue 19';
     this.place.description ='Subway is an American privately-held restaurant franchise that primarily sells submarine sandwiches and salads. It is one of the fastest-growing franchises in the world and, as of October 2019, had 41,512 locations in more than 100 countries.';
//     this.place.icon =  "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
     this.place.infoWindow = this.generateInfoWindow();
  }

  generateInfoWindow() {
     let infoWindow : string ='';
     infoWindow += "<div id='iw-container'><div class='iw-title'>" + this.place.name + '</div>' +
                   "<div class='iw-content'><div class='iw-subTitle'>" + this.place.address + '</div>' +
                   "<p>" + this.place.description  + "</p>" +
                   "<div class='iw-subTitle'>Contacts</div> <p><br>" +
                    "Some contacts here" + "</p></div>" +
                    " <div class='iw-bottom-gradient'></div> </div>";
   return infoWindow;
 }

  onSubmit(form: NgForm) {
     this.ps.addPlace(this.place);
     console.log(this.place);
 }

 onFileChanged(event ) {
    const file = event.target.files[0];
    console.log(file);
}
}
