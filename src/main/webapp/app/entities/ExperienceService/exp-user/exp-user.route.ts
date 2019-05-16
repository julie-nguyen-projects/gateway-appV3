import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpUser } from 'app/shared/model/ExperienceService/exp-user.model';
import { ExpUserService } from './exp-user.service';
import { ExpUserComponent } from './exp-user.component';
import { ExpUserDetailComponent } from './exp-user-detail.component';
import { ExpUserUpdateComponent } from './exp-user-update.component';
import { ExpUserDeletePopupComponent } from './exp-user-delete-dialog.component';
import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

@Injectable({ providedIn: 'root' })
export class ExpUserResolve implements Resolve<IExpUser> {
    constructor(private service: ExpUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExpUser>) => response.ok),
                map((expUser: HttpResponse<ExpUser>) => expUser.body)
            );
        }
        return of(new ExpUser());
    }
}

export const expUserRoute: Routes = [
    {
        path: '',
        component: ExpUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExpUserDetailComponent,
        resolve: {
            expUser: ExpUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExpUserUpdateComponent,
        resolve: {
            expUser: ExpUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExpUserUpdateComponent,
        resolve: {
            expUser: ExpUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expUserPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExpUserDeletePopupComponent,
        resolve: {
            expUser: ExpUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
