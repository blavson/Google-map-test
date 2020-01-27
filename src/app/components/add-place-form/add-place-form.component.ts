import { Component, OnInit } from '@angular/core';
import { NgForm , NgModel} from '@angular/forms';
import { Place } from 'src/app/models/place';
import {PlacesServiceService} from 'src/app/services/places-service.service';
import { Observable } from 'rxjs';

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
     infoWindow : '',
     rating : 0,
     icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
}

  constructor(private ps : PlacesServiceService) {
}

  ngOnInit() {
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
   this.place.infoWindow = this.generateInfoWindow();
   this.ps.addPlace(this.place);
   form.reset();
 }

 onFileChanged(event ) {
    const file = event.target.files[0];
    console.log(file);
}
}
