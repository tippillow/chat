import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.less']
})
export class SendMessageComponent implements OnInit {
    @ViewChild('inputText') input: ElementRef;

    @Output() sendMessage: EventEmitter<any> = new EventEmitter<any>();

    public textMessage = new FormControl('', Validators.required);

    constructor() {
    }

    ngOnInit(): void {
    }

    public onSendClick(): void {
        this.sendMessage.emit();
    }

}
