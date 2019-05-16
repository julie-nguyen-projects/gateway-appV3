export interface IExpUser {
    id?: string;
}

export class ExpUser implements IExpUser {
    constructor(public id?: string) {}
}
