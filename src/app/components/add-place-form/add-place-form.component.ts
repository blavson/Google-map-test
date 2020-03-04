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
      image: new FormControl(null, { validators : [Validators.required], asyncValidators: [this.mimeTypeValidator] })
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
    this.place.name = this.form.get('name').value;
    this.place.address = this.form.get('address').value;
    this.place.description = this.form.get('description').value;
    this.place.image = this.form.get('image').value.name;

    const tmpFile : File = this.form.get('image').value;
    this.ps.addPlace(this.place, tmpFile);
    this.form.reset();
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.place.image = file.name;
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    //console.log(file,   console.log(this.form));
   // this.addImageDetails(file);
  }


  addImageDetails(f: File) {
    const details = document.querySelector('.image_preview');
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(f);
  }

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
        }
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
}
