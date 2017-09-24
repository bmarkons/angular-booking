import { AccommodationType } from './accommodation_type';
import { Place } from './place';
import { Room } from './room';

export class Accommodation {
  id: number;
  name: string;
  accommodation_type: AccommodationType;
  place: Place;
  user: any;
  rooms: Room[];
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string;
  approved: boolean;
}
