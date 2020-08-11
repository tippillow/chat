import {IUserData} from "../user-data";

export interface IMessageDto {
    id: number;
    text: string;
    author: IUserData;
    time: string;
}
