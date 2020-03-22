export class Place {
  _id : string;
  [x: string]: string;
  name: string;
  address: string;
  location: {
    type: {
      type: string,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [number],
      required: true
    }
  }
  icon: string;
  image?: string;
  rating?: string;
  description: string;
  infoWindow: string;
}
