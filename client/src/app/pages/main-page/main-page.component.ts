import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {IChat} from "../../interfaces/chat";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

    public chats: IChat[] = [
        {
            name: 'work',
            img: 'https://memepedia.ru/wp-content/uploads/2016/03/hide-the-pain-harold.jpg',
            route: '/work'
        },
        {
            name: 'flood',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgoZzi4FHMsw91HdNEcc7OEcBnj_IlK4qo0Q&usqp=CAU',
            route: '../flood'
        }
    ];

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {

    }

    public logout(): void {
        this.authService.logout();
    }

}
