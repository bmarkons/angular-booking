import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule
  ],
  providers: [ Angular2TokenService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
