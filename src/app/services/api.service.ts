import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AccommodationType } from '../models/accommodation_type';
import { Accommodation } from '../models/accommodation';

@Injectable()
export class ApiService {
  private url = {
    getAccommodationTypes: 'http://localhost:3000/accommodation_types.json',
    createAccommodation: 'http://localhost:3000/accommodations.json'
  }

  private headers = { headers: new Headers({'Content-Type': 'application/json'}) };

  constructor(private http: Http) { }

  getAccommodationTypes(): Promise<AccommodationType[]> {
    return this.http.get(this.url.getAccommodationTypes)
                    .toPromise()
                    .then(response => response.json() as AccommodationType[])
  }

  createAccommodation(accommodation: Accommodation): Promise<Accommodation> {
    return this.http
    .post(
      this.url.createAccommodation,
      JSON.stringify({ accommodation: accommodation }),
      this.headers
    ).toPromise().then(res => res.json().data as Accommodation)
  }
}
