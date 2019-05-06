export interface IUserExtra {
    id?: string;
    title?: string;
    userLogin?: string;
    userId?: string;
}

export class UserExtra implements IUserExtra {
    constructor(public id?: string, public title?: string, public userLogin?: string, public userId?: string) {}
}
