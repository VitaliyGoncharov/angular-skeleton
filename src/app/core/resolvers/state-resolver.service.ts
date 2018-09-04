import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of, Observable} from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class StateResolverService implements Resolve<string> {
    constructor(private authS: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        let status = localStorage.getItem('status');
        if (status) {
            console.log("Tokens are ok!");
            this.authS.isLoggedIn.next(true);
            return of("user is logged in");
        }

        if (!status) {
            setTimeout( () => {
                console.log("Try to refresh tokens");
                this.authS.isLoggedIn.next(false);
                return of("tokens refreshed");
            }, 5000);
        }
    }
}