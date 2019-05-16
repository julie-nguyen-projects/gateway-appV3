export interface IPost {
    id?: string;
    content?: string;
    userFeedId?: string;
}

export class Post implements IPost {
    constructor(public id?: string, public content?: string, public userFeedId?: string) {}
}
