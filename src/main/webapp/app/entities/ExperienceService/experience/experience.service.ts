import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExperience } from 'app/shared/model/ExperienceService/experience.model';

type EntityResponseType = HttpResponse<IExperience>;
type EntityArrayResponseType = HttpResponse<IExperience[]>;

@Injectable({ providedIn: 'root' })
export class ExperienceService {
    public resourceUrl = SERVER_API_URL + 'experienceservice/api/experiences';

    constructor(protected http: HttpClient) {}

    create(experience: IExperience): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(experience);
        return this.http
            .post<IExperience>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(experience: IExperience): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(experience);
        return this.http
            .put<IExperience>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(experience: IExperience): IExperience {
        const copy: IExperience = Object.assign({}, experience, {
            beginningDate:
                experience.beginningDate != null && experience.beginningDate.isValid()
                    ? experience.beginningDate.format(DATE_FORMAT)
                    : null,
            endingDate: experience.endingDate != null && experience.endingDate.isValid() ? experience.endingDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.beginningDate = res.body.beginningDate != null ? moment(res.body.beginningDate) : null;
            res.body.endingDate = res.body.endingDate != null ? moment(res.body.endingDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((experience: IExperience) => {
                experience.beginningDate = experience.beginningDate != null ? moment(experience.beginningDate) : null;
                experience.endingDate = experience.endingDate != null ? moment(experience.endingDate) : null;
            });
        }
        return res;
    }
}
