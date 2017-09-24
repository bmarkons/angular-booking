import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response } from "@angular/http";

import { AccommodationType } from '../models/accommodation_type';
import { Accommodation } from '../models/accommodation';
import { Place } from '../models/place';
import { Room } from '../models/room';
import { User } from '../models/user';

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

  convert(accommodation: Accommodation){
    return {
      name: accommodation.name,
      accommodation_type_id: accommodation.accommodation_type.id,
      place_id: accommodation.place.id,
      description: accommodation.description,
      address: accommodation.address,
      latitude: accommodation.latitude,
      longitude: accommodation.longitude,
      image_url: accommodation.image_url
    }
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
        accommodation: this.convert(accommodation)
      })
    ).map(res => res.json() as Accommodation);
  }

  approve(accommodation: Accommodation):Observable<Accommodation>{
    return this.authService.post(
      `accommodations/${accommodation.id}/approve`,
      null
    ).map(res => res.json() as Accommodation);
  }

  updateAccommodation(accommodation: Accommodation):Observable<Accommodation>{
    return this.authService.put(
      `accommodations/${accommodation.id}`,
      JSON.stringify({
        accommodation: this.convert(accommodation)
      })
    ).map(res => res.json() as Accommodation);
  }
  deleteAccommodation(accommodation: Accommodation):Observable<Accommodation>{
    return this.authService.delete(
      `accommodations/${accommodation.id}`
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

  getRooms(accommodation: Accommodation):Observable<Room[]>{
    return this.authService.get(
      `rooms?accommodation_id=${accommodation.id}`
    ).map(res => res.json() as Room[]);
  }

  // Reservations

  makeReservation(reservation):Observable<Object>{
    return this.authService.post(
      'room_reservations',
      JSON.stringify({
        room_reservation: {
          room_id: reservation.room.id,
          start: reservation.start,
          end: reservation.end
        }
      })
    ).map(res => res.json());
  }

  // Users

  getManagers():Observable<User[]>{
    return this.authService.get(
      'users?role=manager'
    ).map(res => res.json() as User[]);
  }

  toggleBlock(manager: User):Observable<User>{
    return this.authService.post(
      `toggle_block/${manager.id}`,
      null
    ).map(res => res.json());
  }
}
