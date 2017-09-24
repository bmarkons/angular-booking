import { Accommodation } from './accommodation';

export class Room {
  id: number;
  number: number;
  accommodation: Accommodation;
  beds: number;
  description: string;
  price: number;
}
