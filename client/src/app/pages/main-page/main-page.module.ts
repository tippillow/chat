import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {MainPageRoutingModule} from "./main-page.routing";
import {ChatComponent} from './components/chat/chat.component';
import {MessagesComponent} from './components/messages/messages.component';
import {MessageComponent} from './components/message/message.component';
import {SendMessageComponent} from "./components/send-message/send-message.component";
import {SharedModule} from "../../components/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        MainPageComponent,
        ChatComponent,
        MessagesComponent,
        MessageComponent,
        SendMessageComponent
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class MainPageModule {
}
