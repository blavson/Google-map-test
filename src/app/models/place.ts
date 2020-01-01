export class Place {
  name : string;
  address : string;
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
  icon : string;
  rating : number;
  description : string;
}