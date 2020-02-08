import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    this.addImageDetails(file);
  }


  addImageDetails(f : File) {
    const details = document.querySelector('.image_preview');
    const img = this.form.get('image');
    const reader = new FileReader();
    reader.onload= () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(f);
    console.log(this.imagePreview);
    let html = ` <div class="card" style="width: 18rem;">
             <img class="card-img-top" [src]="${img.value.name}" [alt]="title">
    <div class="card-body">
      <h5 class="card-title">${img.value.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Size : ${img.value.size}</li>
      <li class="list-group-item">Type : ${img.value.type}</li>
    </ul>
  </div>`;
  details.innerHTML = html;
  }
}
