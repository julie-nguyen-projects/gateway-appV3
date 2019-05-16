export interface IUserFeed {
    id?: string;
}

export class UserFeed implements IUserFeed {
    constructor(public id?: string) {}
}
