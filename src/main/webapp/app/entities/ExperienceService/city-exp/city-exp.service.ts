import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';

type EntityResponseType = HttpResponse<ICityExp>;
type EntityArrayResponseType = HttpResponse<ICityExp[]>;

@Injectable({ providedIn: 'root' })
export class CityExpService {
    public resourceUrl = SERVER_API_URL + 'experienceservice/api/city-exps';

    constructor(protected http: HttpClient) {}

    create(cityExp: ICityExp): Observable<EntityResponseType> {
        return this.http.post<ICityExp>(this.resourceUrl, cityExp, { observe: 'response' });
    }

    update(cityExp: ICityExp): Observable<EntityResponseType> {
        return this.http.put<ICityExp>(this.resourceUrl, cityExp, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICityExp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICityExp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
