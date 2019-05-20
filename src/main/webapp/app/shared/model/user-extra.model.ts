import { Moment } from 'moment';

export interface IUserExtra {
    id?: string;
    title?: string;
    birthdate?: Moment;
    userLogin?: string;
    userId?: string;
    cityName?: string;
    cityId?: string;
    firstName?: string;
    lastName?: string;
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: string,
        public title?: string,
        public birthdate?: Moment,
        public userLogin?: string,
        public userId?: string,
        public cityName?: string,
        public cityId?: string,
        public firstName?: string,
        public lastName?: string
    ) {}
}
