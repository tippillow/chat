import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserData} from "../../../../interfaces/user-data";
import {IMessage} from "../../../../interfaces/message";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
    @Input() message: IMessage;
    @Input() currentUser: IUserData;

    @Output() deleteMessage: EventEmitter<any> = new EventEmitter<any>();
    @Output() editMessage: EventEmitter<any> = new EventEmitter<any>();

    public isOpen = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    public onRightClick(evt: MouseEvent): void {
        evt.preventDefault();
        this.isOpen = !this.isOpen;
    }

    public onDeleteClick(): void {
        this.deleteMessage.emit(this.message);
        this.isOpen = !this.isOpen;
    }

    public onEditClick(): void {
        this.editMessage.emit(this.message);
        this.isOpen = !this.isOpen;
    }

}
