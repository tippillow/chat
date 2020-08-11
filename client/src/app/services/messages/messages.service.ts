import {Injectable} from '@angular/core';
import {WebSocketService} from "../web-socket/web-socket.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IMessage} from "../../interfaces/message";
import {IMessageDto} from "../../interfaces/dto/message.dto";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    private _messages$ = new BehaviorSubject<IMessage[]>(null);

    constructor(private webSocketService: WebSocketService, private authService: AuthService) {
    }

    public get messages$(): Observable<IMessage[]> {
        return this._messages$.asObservable();
    }

    public getMessages(path: string): void {
        this.webSocketService.emit('join', path);
        this.webSocketService.listen('message').subscribe((messages: IMessageDto[]) => {
            this._messages$.next(this.mapIMessageDTOtoIMessage(messages));
        });
    }

    public deleteMessage(message: IMessage, chat: string): void {
        this.webSocketService.emit('delete', {message, chat});
    }

    public sendMessage(chat: string, message: IMessage): void {
        this.webSocketService.emit('message',
            {
                chat,
                message,
            }
        );
    };

    private mapIMessageDTOtoIMessage(messages: IMessageDto[]): IMessage[] {
        if (messages) {
            return messages.map((message: IMessageDto) => {
                const {id, text, author, time} = message;

                return {
                    id,
                    text,
                    author,
                    isCanEdit: this.authService.user?.name === author.name,
                    time,
                };
            });
        }
    }
}
