export interface ICompany {
    id?: string;
    name?: string;
    cityExpName?: string;
    cityExpId?: string;
}

export class Company implements ICompany {
    constructor(public id?: string, public name?: string, public cityExpName?: string, public cityExpId?: string) {}
}
