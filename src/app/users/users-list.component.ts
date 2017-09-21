import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  managers: User[];
  selected: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getManagers().subscribe(managers => this.managers = managers);
  }

  block(user: User):void{
    this.auth.toggleBlock(user).subscribe(u => user.blocked = u.blocked);
  }

}
