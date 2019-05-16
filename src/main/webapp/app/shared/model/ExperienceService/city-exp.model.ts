export interface ICityExp {
    id?: string;
    name?: string;
    countryExpName?: string;
    countryExpId?: string;
}

export class CityExp implements ICityExp {
    constructor(public id?: string, public name?: string, public countryExpName?: string, public countryExpId?: string) {}
}
