export interface ISchool {
    id?: string;
    name?: string;
    cityExpName?: string;
    cityExpId?: string;
}

export class School implements ISchool {
    constructor(public id?: string, public name?: string, public cityExpName?: string, public cityExpId?: string) {}
}
