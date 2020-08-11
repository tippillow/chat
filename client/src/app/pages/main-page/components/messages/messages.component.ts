import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {SendMessageComponent} from "../send-message/send-message.component";
import {MessagesService} from "../../../../services/messages/messages.service";
import {IMessage} from "../../../../interfaces/message";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {

    @ViewChild('sendBlock') sendMessageBlock: SendMessageComponent;

    public messages$: Observable<IMessage[]>;
    public currentChat: string;
    public messageToEdit = null;
    public currentUser = this.authService.user;

    constructor(private router: Router,
                private messagesService: MessagesService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.currentChat = this.router.url.split('/')[2];

        this.messagesService.getMessages(this.currentChat);


        this.router.events.subscribe(() => {
            this.currentChat = this.router.url.split('/')[2];
            this.messagesService.getMessages(this.currentChat);
        });

        this.messages$ = this.messagesService.messages$;
    }

    public deleteMessage(message: IMessage): void {
        this.messagesService.deleteMessage(message, this.currentChat);
    }

    public editMessage(message: IMessage): void {
        this.sendMessageBlock.input.nativeElement.focus();
        this.messageToEdit = message;
        this.sendMessageBlock.textMessage.setValue(message.text);
    }

    public sendMessage(): void {
        const currentDay = new Date();

        if (this.messageToEdit) {
            this.messageToEdit.text = this.sendMessageBlock.input.nativeElement.value;

            this.messagesService.sendMessage(this.currentChat, this.messageToEdit);

            this.messageToEdit = null;

        } else {
            this.messagesService.sendMessage(this.currentChat, {
                id: null,
                text: this.sendMessageBlock.input.nativeElement.value,
                author: {
                    name: this.authService.user.name,
                    avatar: this.authService.user.avatar,
                },
                isCanEdit: null,
                time: `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}
                        ${currentDay.getHours()}:${currentDay.getMinutes() < 10 ?
                            '0' + currentDay.getMinutes() :
                            currentDay.getMinutes()}`,
            });

        }
        this.sendMessageBlock.input.nativeElement.value = '';
    }

}
