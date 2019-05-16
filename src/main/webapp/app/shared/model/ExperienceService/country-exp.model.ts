export interface ICountryExp {
    id?: string;
    name?: string;
}

export class CountryExp implements ICountryExp {
    constructor(public id?: string, public name?: string) {}
}
