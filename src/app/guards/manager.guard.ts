import { Injectable }     from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService,
              private router:Router){}

  canActivate() {
    return this.authTokenService.validateToken().map(res => {
      if(this.authTokenService.currentUserData["role"] == "manager"){
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }

}
