export interface IMessage {
    id?: string;
    content?: string;
    conversationId?: string;
    userConvId?: string;
}

export class Message implements IMessage {
    constructor(public id?: string, public content?: string, public conversationId?: string, public userConvId?: string) {}
}
