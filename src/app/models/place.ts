export class Place {
  name: string;
  address: string;
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
  pinIcon: string;
  image: string;
  rating: number;
  title: string;
  infoWindow: Text;
  description: string;
}
