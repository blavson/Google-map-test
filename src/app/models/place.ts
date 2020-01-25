export class Place {
  name: string;
  address: string;
  location?: {
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
  icon?: string;
  image?: string;
  rating?: number;
  description: string;
  infoWindow : string;
}
