import { Injectable }     from '@angular/core';
import {CanActivate} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService){}

  canActivate() {
    return this.authTokenService.validateToken().map(
      res => {
        return true;
      }
    ).catch(error => {
      return Observable.of(true);
    });
  }

}
