import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

type EntityResponseType = HttpResponse<ICountryExp>;
type EntityArrayResponseType = HttpResponse<ICountryExp[]>;

@Injectable({ providedIn: 'root' })
export class CountryExpService {
    public resourceUrl = SERVER_API_URL + 'experienceservice/api/country-exps';

    constructor(protected http: HttpClient) {}

    create(countryExp: ICountryExp): Observable<EntityResponseType> {
        return this.http.post<ICountryExp>(this.resourceUrl, countryExp, { observe: 'response' });
    }

    update(countryExp: ICountryExp): Observable<EntityResponseType> {
        return this.http.put<ICountryExp>(this.resourceUrl, countryExp, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICountryExp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountryExp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
