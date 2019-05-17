import { Moment } from 'moment';

export interface IUserExtra {
    id?: string;
    title?: string;
    birthdate?: Moment;
    pictureContentType?: string;
    picture?: any;
    userLogin?: string;
    userId?: string;
    cityName?: string;
    cityId?: string;
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: string,
        public title?: string,
        public birthdate?: Moment,
        public pictureContentType?: string,
        public picture?: any,
        public userLogin?: string,
        public userId?: string,
        public cityName?: string,
        public cityId?: string
    ) {}
}
