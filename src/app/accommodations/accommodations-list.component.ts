import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { AuthService } from '../services/auth.service';
import {Angular2TokenService} from "angular2-token";

import { Accommodation } from '../models/accommodation';
import { Place } from '../models/place';
import { AccommodationType } from '../models/accommodation_type';

declare var Materialize:any;

@Component({
  selector: 'accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.sass']
})
export class AccommodationsListComponent implements OnInit {

  accommodations: Accommodation[];
  selected: Accommodation;
  edited: Accommodation;
  editing = false;
  rooms = [];
  reservation = {
    room: null,
    start: null,
    end: null
  }
  accommodationTypes: AccommodationType[];
  places: Place[];

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

    if(this.editing) { this.cancelEdit(); }
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

  startEdit():void{
    this.auth.getAccommodationTypes().subscribe(
      accommodationTypes => {
        this.accommodationTypes = accommodationTypes;
        this.auth.getPlaces().subscribe(
          places => {
            this.places = places;
            this.edited = Object.assign({}, this.selected) as Accommodation;
            this.editing = true;
          }
        );
      }
    );
  }

  cancelEdit():void{
    this.editing = false;
    this.edited = null;
  }

  update():void{
    this.auth.updateAccommodation(this.edited).subscribe(
      accommodation => {
        Object.assign(this.selected, accommodation);
        Materialize.toast(`${accommodation.name} is saved!`, 3000, 'rounded');
        this.cancelEdit();
      },
      () => {
        Materialize.toast(`Error occured`, 3000, 'rounded');
      }
    );
  }
}
