export interface ICompany {
    id?: string;
    name?: string;
    cityName?: string;
    cityId?: string;
}

export class Company implements ICompany {
    constructor(public id?: string, public name?: string, public cityName?: string, public cityId?: string) {}
}
