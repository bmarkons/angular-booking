import { Component, OnInit } from '@angular/core';
import { CreateAccommodationComponent } from '../accommodations/create-accommodation.component';
import { CreateRoomComponent } from '../accommodations/create-room.component';
import { Angular2TokenService } from 'angular2-token';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(public tokenService: Angular2TokenService) { }

  ngOnInit() {

  }

}
