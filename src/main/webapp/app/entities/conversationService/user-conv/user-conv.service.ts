import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';

type EntityResponseType = HttpResponse<IUserConv>;
type EntityArrayResponseType = HttpResponse<IUserConv[]>;

@Injectable({ providedIn: 'root' })
export class UserConvService {
    public resourceUrl = SERVER_API_URL + 'conversationservice/api/user-convs';

    constructor(protected http: HttpClient) {}

    create(userConv: IUserConv, newId: string): Observable<EntityResponseType> {
        const urlId = this.resourceUrl + '/' + newId;
        return this.http.post<IUserConv>(urlId, userConv, { observe: 'response' });
    }

    update(userConv: IUserConv, newId: string): Observable<EntityResponseType> {
        const urlId = this.resourceUrl + '/' + newId;
        return this.http.put<IUserConv>(urlId, userConv, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IUserConv>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserConv[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
