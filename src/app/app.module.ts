import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAccommodationComponent } from './accommodations/create-accommodation.component';
import { CreateRoomComponent } from './accommodations/create-room.component';

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ManagerGuard } from "./guards/manager.guard";
import { AuthService } from "./services/auth.service";
import { ApiService } from "./services/api.service";
import { AccommodationsListComponent } from './accommodations/accommodations-list.component';
import { UsersListComponent } from './users/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    CreateAccommodationComponent,
    CreateRoomComponent,
    AccommodationsListComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
  ],
  providers: [ Angular2TokenService, AuthService, AuthGuard, ApiService, AdminGuard, ManagerGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
