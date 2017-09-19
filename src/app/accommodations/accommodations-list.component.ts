import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { Accommodation } from '../models/accommodation';

@Component({
  selector: 'accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.sass']
})
export class AccommodationsListComponent implements OnInit {

  accommodations: Accommodation[];
  selected: Accommodation;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getAccommodations().subscribe(accommodations => this.accommodations = accommodations);
  }

  approve(accommodation: Accommodation): void {
    this.auth.approve(accommodation).subscribe(acc => accommodation.approved = acc.approved) 
  }
}
