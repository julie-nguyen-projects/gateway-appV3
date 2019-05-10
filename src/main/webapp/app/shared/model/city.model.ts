export interface ICity {
    id?: string;
    name?: string;
    nameWithSymbols?: string;
    postalCode?: string;
    countryName?: string;
    countryId?: string;
}

export class City implements ICity {
    constructor(
        public id?: string,
        public name?: string,
        public nameWithSymbols?: string,
        public postalCode?: string,
        public countryName?: string,
        public countryId?: string
    ) {}
}
