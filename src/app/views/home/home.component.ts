import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    state: boolean;

    constructor(private route: ActivatedRoute, private authS: AuthService) { }

    ngOnInit() {
        this.authS.isLoggedIn.subscribe(data => {
            console.log(data);
            this.state = data;
        });
    }

    addStatus() {
        localStorage.setItem('status','true');
    }
  
    rmvStatus() {
        localStorage.removeItem('status');
    }
}