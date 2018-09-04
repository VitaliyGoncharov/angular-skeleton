import { Injectable } from "@angular/core";
import { CanLoad, CanActivateChild } from "@angular/router";
import { Route } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadGuard implements CanActivateChild {
    constructor(private authS: AuthService) { }

    canActivateChild(): Promise<boolean> {
        let status = localStorage.getItem('status');
        if (status) {
            console.log("Tokens are ok!");
            this.authS.isLoggedIn.next(true);
            return Promise.resolve(true);
        }

        if (!status) {
            return new Promise( (res, rej) => {
                setTimeout( () => {
                    console.log("Try to refresh tokens");
                    localStorage.setItem('status','true');
                    this.authS.isLoggedIn.next(true);
                    return res(true);
                }, 3000);
            });
        }
    }
}