import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';

export interface IConversation {
    id?: string;
    userConvs?: IUserConv[];
}

export class Conversation implements IConversation {
    constructor(public id?: string, public userConvs?: IUserConv[]) {}
}
