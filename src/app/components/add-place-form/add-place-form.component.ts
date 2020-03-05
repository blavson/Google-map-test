import { Observable, Observer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Place } from 'src/app/models/place';
import { PlacesServiceService } from 'src/app/services/places-service.service';

@Component({
  selector: 'app-add-place-form',
  templateUrl: './add-place-form.component.html',
  styleUrls: ['./add-place-form.component.css']
})
export class AddPlaceFormComponent implements OnInit {
  form: FormGroup;
  private place : Place;
  imagePreview: string;

  constructor(private ps: PlacesServiceService) { }

  ngOnInit() {
     this. place = new Place();
     this. place.name='rusta1';
     this.place.address = 'rustaveli ave 2';
     this.place.description= 'Just a rustaveli ave 2 description';
     this.place.infoWindow = '';
     this.place.rating = 0;
     this.place.icon= 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
     this.place.image = null;

      /*({
      name: 'rusta1',
      address: 'Rustaveli ave 1',
      description: 'Just a rustaveli ave 1 description',
      infoWindow: '',
      rating: 0,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
   });
*/
    this.form = new FormGroup({
      name: new FormControl(null, { validators : [Validators.required] }),
      address: new FormControl(null, { validators : [Validators.required] }),
      description: new FormControl(this.place.description),
      myimage: new FormControl(null, { validators : [Validators.required],
         // asyncValidators: [this.mimeTypeValidator]
       })
    });
  }

  generateInfoWindow() {
    let infoWindow: string = '';
    infoWindow += '<div id=\'iw-container\'><div class=\'iw-title\'>' + this.place.name + '</div>' +
      '<div class=\'iw-content\'><div class=\'iw-subTitle\'>' + this.place.address + '</div>' +
      '<p>' + this.place.description + '</p>' +
      '<div class=\'iw-subTitle\'>Contacts</div> <p><br>' +
      'Some contacts here' + '</p></div>' +
      ' <div class=\'iw-bottom-gradient\'></div> </div>';
    return infoWindow;
  }

  onSubmit() {
    this.place.infoWindow = this.generateInfoWindow();
    this.place.name = this.form.value.name;
    this.place.address = this.form.value.address
    this.place.description = this.form.value.description;
    const img = this.form.get('myimage').value;
    //this.place.image = this.form.value.myThumbnail;
    this.ps.addPlace(this.place, img);
   // this.form.reset();
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ myimage: file });
    this.form.get('myimage').updateValueAndValidity();
   // this.addImageDetails(file);
  }


/*
  mimeTypeValidator = (control: AbstractControl): Observable<{ [key: string]: any }> | Promise<{ [key: string]: any }> => {
    const localFile = control.value as File;
    console.log('asyncValidator = ' + localFile);
    const freader = new FileReader();
    let isValid = false;
    const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {

      freader.addEventListener('loadend', () => {
        const u8 = new Uint8Array(freader.result as ArrayBuffer).subarray(0, 2);
        let someFormat = '';
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < u8.length; index++) {
          someFormat += u8[index].toString(16);
       }const express = require('express');
const app = express();
        if (someFormat === 'ffd8' || someFormat === '8950') {
          isValid = true;
        }
        if (isValid) {
          observer.next({ status: true });
        } else {
          observer.error({
            status: false,
            errorMsg: 'Wrong file format'
          });
        }
        observer.complete();
      });
         freader.readAsArrayBuffer(localFile);
    });
    return frObs;
  }
  */
}
