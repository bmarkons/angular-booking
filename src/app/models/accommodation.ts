import { AccommodationType } from './accommodation_type';
import { Place } from './place';

export class Accommodation {
  name: string;
  accommodation_type: AccommodationType;
  place: Place;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string;
  approved: boolean;
}
