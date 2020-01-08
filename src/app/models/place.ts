export class Place {
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
  pinIcon: string;
  image: string;
  rating: number;
  title: string;
  category: string;
  tags: string;
  description: string;
}
