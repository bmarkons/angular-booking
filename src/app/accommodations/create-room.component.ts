import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { Accommodation } from '../models/accommodation';
import { Room } from '../models/room';

@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.sass']
})

export class CreateRoomComponent implements OnInit {

  accommodations: Accommodation[];

  room = {
    number: null,
    accommodation: null,
    beds: null,
    description: '',
    price: null
  }

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getAccommodations().subscribe(accommodations => this.accommodations = accommodations);
  }

  create():void {
    this.auth.createRoom(this.room as Room).subscribe(room => console.log(room));
  }
}
