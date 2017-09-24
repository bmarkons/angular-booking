import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {AccommodationsListComponent} from "./accommodations/accommodations-list.component";
import {CreateAccommodationComponent} from "./accommodations/create-accommodation.component";
import {CreateRoomComponent} from "./accommodations/create-room.component";
import {UsersListComponent} from "./users/users-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {ManagerGuard} from "./guards/manager.guard";
import {HomeGuard} from "./guards/home.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [HomeGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations',
    component: AccommodationsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations/create',
    component: CreateAccommodationComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'rooms/create',
    component: CreateRoomComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'managers',
    component: UsersListComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
