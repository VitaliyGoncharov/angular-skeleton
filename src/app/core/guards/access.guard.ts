import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MainComponent } from "../../main/main.component";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor(private authS: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // let status = localStorage.getItem('status');
        // if (status) this.authS.isLoggedIn.next(true);
        // if (!status) this.authS.isLoggedIn.next(false);
        return of(true).pipe(delay(2000));
    }
}