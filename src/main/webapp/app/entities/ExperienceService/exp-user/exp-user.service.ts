import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

type EntityResponseType = HttpResponse<IExpUser>;
type EntityArrayResponseType = HttpResponse<IExpUser[]>;

@Injectable({ providedIn: 'root' })
export class ExpUserService {
    public resourceUrl = SERVER_API_URL + 'experienceservice/api/exp-users';

    constructor(protected http: HttpClient) {}

    create(expUser: IExpUser): Observable<EntityResponseType> {
        return this.http.post<IExpUser>(this.resourceUrl, expUser, { observe: 'response' });
    }

    update(expUser: IExpUser): Observable<EntityResponseType> {
        return this.http.put<IExpUser>(this.resourceUrl, expUser, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IExpUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExpUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
