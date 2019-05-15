import { IConversation } from 'app/shared/model/conversationService/conversation.model';

export interface IUserConv {
    id?: string;
    conversations?: IConversation[];
}

export class UserConv implements IUserConv {
    constructor(public id?: string, public conversations?: IConversation[]) {}
}
