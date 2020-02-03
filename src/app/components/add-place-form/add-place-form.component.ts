import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from 'src/app/models/place';
import { PlacesServiceService } from 'src/app/services/places-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-place-form',
  templateUrl: './add-place-form.component.html',
  styleUrls: ['./add-place-form.component.css']
})
export class AddPlaceFormComponent implements OnInit {
  form: FormGroup;
  place: Place = {
    name: '',
    address: '',
    description: '',
    infoWindow: '',
    rating: 0,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  }

  constructor(private ps: PlacesServiceService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [])
    });
  }

  generateInfoWindow() {
    let infoWindow: string = '';
    infoWindow += "<div id='iw-container'><div class='iw-title'>" + this.place.name + '</div>' +
      "<div class='iw-content'><div class='iw-subTitle'>" + this.place.address + '</div>' +
      "<p>" + this.place.description + "</p>" +
      "<div class='iw-subTitle'>Contacts</div> <p><br>" +
      "Some contacts here" + "</p></div>" +
      " <div class='iw-bottom-gradient'></div> </div>";
    return infoWindow;
  }

  onSubmit() {
    console.log(this.form);
    /*
       this.place.infoWindow = this.generateInfoWindow();
       this.form.setValue({ 'name' : this.place.name,'address' : this.place.address, 'description' : this.place.description });
       this.ps.addPlace(this.place);
    */
    this.form.reset();
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }


}
