import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import {ICity} from 'app/shared/model/city.model';

type EntityResponseType = HttpResponse<IUserExtra>;
type EntityArrayResponseType = HttpResponse<IUserExtra[]>;

@Injectable({ providedIn: 'root' })
export class UserExtraService {
    public resourceUrl = SERVER_API_URL + 'api/user-extras';

    constructor(protected http: HttpClient) {}

    create(userExtra: IUserExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userExtra);
        return this.http
            .post<IUserExtra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(userExtra: IUserExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userExtra);
        return this.http
            .put<IUserExtra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IUserExtra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUserExtra[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getUsersByNameOrFirstNameContains(firstname: string, lastname: string) {
        return this.http.get<IUserExtra[]>(`${this.resourceUrl}/nameOrFirstNameContains/${firstname}/${lastname}`, { observe: 'response' });

    }

    protected convertDateFromClient(userExtra: IUserExtra): IUserExtra {
        const copy: IUserExtra = Object.assign({}, userExtra, {
            birthdate: userExtra.birthdate != null && userExtra.birthdate.isValid() ? userExtra.birthdate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthdate = res.body.birthdate != null ? moment(res.body.birthdate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((userExtra: IUserExtra) => {
                userExtra.birthdate = userExtra.birthdate != null ? moment(userExtra.birthdate) : null;
            });
        }
        return res;
    }
}
