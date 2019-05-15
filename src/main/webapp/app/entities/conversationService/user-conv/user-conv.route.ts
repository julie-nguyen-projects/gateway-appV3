import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserConv } from 'app/shared/model/conversationService/user-conv.model';
import { UserConvService } from './user-conv.service';
import { UserConvComponent } from './user-conv.component';
import { UserConvDetailComponent } from './user-conv-detail.component';
import { UserConvUpdateComponent } from './user-conv-update.component';
import { UserConvDeletePopupComponent } from './user-conv-delete-dialog.component';
import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';

@Injectable({ providedIn: 'root' })
export class UserConvResolve implements Resolve<IUserConv> {
    constructor(private service: UserConvService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserConv> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserConv>) => response.ok),
                map((userConv: HttpResponse<UserConv>) => userConv.body)
            );
        }
        return of(new UserConv());
    }
}

export const userConvRoute: Routes = [
    {
        path: '',
        component: UserConvComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserConvs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserConvDetailComponent,
        resolve: {
            userConv: UserConvResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserConvs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserConvUpdateComponent,
        resolve: {
            userConv: UserConvResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserConvs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserConvUpdateComponent,
        resolve: {
            userConv: UserConvResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserConvs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userConvPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserConvDeletePopupComponent,
        resolve: {
            userConv: UserConvResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserConvs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
