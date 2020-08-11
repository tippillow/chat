import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IChat} from "../../../../interfaces/chat";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

    @Input() chats: IChat[];
    @Output() chatClick: EventEmitter<string> = new EventEmitter<string>();

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    public onChatClick(path: string): void {
        this.router.navigate([`${path}`], {relativeTo: this.route.parent});
    }
}
