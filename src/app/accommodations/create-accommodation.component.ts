import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AccommodationType } from '../models/accommodation_type';
import { Accommodation } from '../models/accommodation';
import { Place } from '../models/place';

@Component({
  selector: 'create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.sass']
})

export class CreateAccommodationComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  places: Place[];

  accommodation = {
    name: '',
    accommodation_type: null,
    place: null,
    description: '',
    address: '',
    latitude: null,
    longitude: null,
    image_url: '',
    approved: false
  }

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getAccommodationTypes().subscribe(accommodationTypes => this.accommodationTypes = accommodationTypes);
    this.auth.getPlaces().subscribe(places => this.places = places);
  }

  create(): void {
    this.auth.createAccommodation(this.accommodation as Accommodation).subscribe(
      accommodation => {
        this.router.navigate(['/accommodations']);
      }
    );
  }
}
