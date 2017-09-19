import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response } from "@angular/http";

import { AccommodationType } from '../models/accommodation_type';
import { Accommodation } from '../models/accommodation';
import { Place } from '../models/place';
import { Room } from '../models/room';

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(private authService:Angular2TokenService) {

    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    )
  }

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );

  }

  // Accommodation types

  getAccommodationTypes():Observable<AccommodationType[]>{
    return this.authService.get('accommodation_types').map(res => res.json() as AccommodationType[]);
  }

  // Places

  getPlaces():Observable<Place[]>{
    return this.authService.get('places').map(res => res.json() as Place[]);
  }

  // Accommodations

  getAccommodations():Observable<Accommodation[]>{
    return this.authService.get(
      'accommodations'
    ).map(res => res.json() as Accommodation[]);
  }

  createAccommodation(accommodation: Accommodation):Observable<Accommodation>{
    return this.authService.post(
      'accommodations',
      JSON.stringify({ 
        accommodation: {
          name: accommodation.name,
          accommodation_type_id: accommodation.accommodation_type.id,
          place_id: accommodation.place.id,
          description: accommodation.description,
          address: accommodation.address,
          latitude: accommodation.latitude,
          longitude: accommodation.longitude,
          image_url: accommodation.image_url
        }
      })
    ).map(res => res.json() as Accommodation);
  }

  approve(accommodation: Accommodation):Observable<Accommodation>{
    return this.authService.post(
      `accommodations/${accommodation.id}/approve`,
      null
    ).map(res => res.json() as Accommodation);
  }

  // Rooms

  createRoom(room: Room):Observable<Room>{
    return this.authService.post(
      'rooms',
      JSON.stringify({
        room: {
          number: room.number,
          beds: room.beds,
          description: room.description,
          price: room.price,
          accommodation_id: room.accommodation.id
        }
      })
    ).map(res => res.json() as Room);
  }
}
