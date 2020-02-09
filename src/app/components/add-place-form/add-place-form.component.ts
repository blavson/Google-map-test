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
  place: Place = {
    name: '',
    address: '',
    description: '',
    infoWindow: '',
    rating: 0,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  }

  imagePreview : string;


  constructor(private ps: PlacesServiceService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null,  {validators : 
                                    [Validators.required, Validators.minLength(2)]}
                                    ),
      address: new FormControl(null, {validators : [Validators.required, Validators.minLength(2)]}),
      description: new FormControl(null, {validators : [Validators.required]}),
      image: new FormControl(null, {
                            validators : [Validators.required],
                            asyncValidators : [ this.mimeTypeValidator]
                          })
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
    this.addImageDetails(file);
  }


  addImageDetails(f : File) {
    const details = document.querySelector('.image_preview');
    //this.img = this.form.get('image');
    const reader = new FileReader();
    reader.onload= () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(f);
  }

  mimeTypeValidator = ( (control :  AbstractControl) : Observable < {[key : string] : any} > | Promise < {[key : string] : any} >=> {
    const file = control.value as File;
    const freader = new FileReader();
    let isValid = false;
    const frObs =  Observable.create( (observer : Observer < {[key : string] : any} >) => {
      freader.addEventListener("loadend", () => {
        const u8 = new Uint8Array(freader.result as ArrayBuffer).subarray(0,2);
        let someFormat='';
          for (let index = 0; index < u8.length; index++) {
            someFormat  += u8[index].toString(16);
          }
          if (someFormat === "ffd8" || someFormat === "8950")
            isValid = true;          
      if (isValid)
      observer.next({status : true });
    else 
      observer.error({ status : false, 
                       errorMsg : "Wrong file format" });
    observer.complete();   

    });
  });
    freader.readAsArrayBuffer(file); 

    return frObs;
  }); 
}
