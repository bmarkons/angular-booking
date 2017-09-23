import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { AuthService } from '../services/auth.service';
import {Angular2TokenService} from "angular2-token";

import { Accommodation } from '../models/accommodation';

declare var Materialize:any;

@Component({
  selector: 'accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.sass']
})
export class AccommodationsListComponent implements OnInit {

  accommodations: Accommodation[];
  selected: Accommodation;
  rooms = [];
  reservation = {
    room: null,
    start: null,
    end: null
  }

  constructor(
    private auth: AuthService,
    public tokenService: Angular2TokenService
  ) { }

  ngOnInit() {
    this.auth.getAccommodations().subscribe(accommodations => this.accommodations = accommodations);
  }

  onSelectChange(accommodation: Accommodation) {
    this.selected = accommodation;
    this.auth.getRooms(accommodation).subscribe(rooms => this.rooms = rooms);
  }

  approve(accommodation: Accommodation): void {
    this.auth.approve(accommodation).subscribe(acc => accommodation.approved = acc.approved)
  }

  makeReservation():void{
    this.auth.makeReservation(this.reservation).subscribe(
      reservation => Materialize.toast(`Reserved!`, 3000, 'rounded'),
      Materialize.toast('Already reserved in given date range', 3000, 'rounded')
    );
  }
}
