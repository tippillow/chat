import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, filter, take, tap} from "rxjs/operators";
import {of} from "rxjs";
import {IUserData} from "../../interfaces/user-data";
import {Router} from "@angular/router";
import {PathConfig} from "../../config/routing/path.routing";
import {ICredentials} from "../../interfaces/credentials";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(protected http: HttpClient, private router: Router) {
    }

    public get user(): IUserData {
        return JSON.parse(localStorage.user);
    }

    public logout(): void {
        localStorage.setItem('user', null);
        this.router.navigate([PathConfig.AUTH]);
    }

    public login$(credentials: ICredentials): any {
        return this.http.post('http://localhost:5000/login', credentials).pipe(
            catchError((error: HttpErrorResponse) => {

                return of(false);
            }),
            take(1),
            filter((userData: IUserData) => !!userData),
            tap((userData: IUserData) => localStorage.setItem('user', JSON.stringify(userData))),
        ).subscribe(() => {
            if (this.user) {
                this.router.navigate([PathConfig.CHATS]);
            }
        });
    }
}
