import {IUserData} from "./user-data";

export interface IMessage {
    id: number;
    text: string;
    author: IUserData;
    isCanEdit: boolean;
    time: string;
}
