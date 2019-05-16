export interface IComment {
    id?: string;
    content?: string;
    userFeedId?: string;
    postId?: string;
}

export class Comment implements IComment {
    constructor(public id?: string, public content?: string, public userFeedId?: string, public postId?: string) {}
}
