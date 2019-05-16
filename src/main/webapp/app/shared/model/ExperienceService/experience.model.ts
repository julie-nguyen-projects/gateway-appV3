import { Moment } from 'moment';

export const enum Type {
    JOB = 'JOB',
    FORMATION = 'FORMATION'
}

export interface IExperience {
    id?: string;
    title?: string;
    beginningDate?: Moment;
    endingDate?: Moment;
    type?: Type;
    userId?: string;
    companyName?: string;
    companyId?: string;
    schoolName?: string;
    schoolId?: string;
}

export class Experience implements IExperience {
    constructor(
        public id?: string,
        public title?: string,
        public beginningDate?: Moment,
        public endingDate?: Moment,
        public type?: Type,
        public userId?: string,
        public companyName?: string,
        public companyId?: string,
        public schoolName?: string,
        public schoolId?: string
    ) {}
}
