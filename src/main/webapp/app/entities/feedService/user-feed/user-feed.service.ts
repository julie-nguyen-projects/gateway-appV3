import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';

type EntityResponseType = HttpResponse<IUserFeed>;
type EntityArrayResponseType = HttpResponse<IUserFeed[]>;

@Injectable({ providedIn: 'root' })
export class UserFeedService {
    public resourceUrl = SERVER_API_URL + 'feedservice/api/user-feeds';

    constructor(protected http: HttpClient) {}

    create(userFeed: IUserFeed, newId: string): Observable<EntityResponseType> {
        const urlId = this.resourceUrl + '/' + newId;
        return this.http.post<IUserFeed>(urlId, userFeed, { observe: 'response' });
    }

    update(userFeed: IUserFeed, newId: string): Observable<EntityResponseType> {
        const urlId = this.resourceUrl + '/' + newId;
        return this.http.put<IUserFeed>(urlId, userFeed, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IUserFeed>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserFeed[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
