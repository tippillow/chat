import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ICredentials} from "../../interfaces/credentials";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    public login(credentials: ICredentials): void {
        this.authService.login$(credentials);
    }

}
