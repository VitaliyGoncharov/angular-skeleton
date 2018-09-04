import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';

@Component({
    selector: 'main-header',
    templateUrl: './_header.component.html',
    styleUrls: ['./_header.component.scss']
})
export class HeaderComponent  implements OnInit {
    isLoggedIn: boolean;

    constructor(private authS: AuthService) { }

    ngOnInit() {
        this.authS.isLoggedIn.subscribe(data => {
            console.log(data);
            this.isLoggedIn = data;
        });
    }

    login() {
        localStorage.setItem('status', 'true');
        this.authS.isLoggedIn.next(true);
        return false;
    }

    logout() {
        localStorage.removeItem('status');
        this.authS.isLoggedIn.next(false);
        return false;
    }
}