import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { CityExpService } from './city-exp.service';
import { CityExpComponent } from './city-exp.component';
import { CityExpDetailComponent } from './city-exp-detail.component';
import { CityExpUpdateComponent } from './city-exp-update.component';
import { CityExpDeletePopupComponent } from './city-exp-delete-dialog.component';
import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';

@Injectable({ providedIn: 'root' })
export class CityExpResolve implements Resolve<ICityExp> {
    constructor(private service: CityExpService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICityExp> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CityExp>) => response.ok),
                map((cityExp: HttpResponse<CityExp>) => cityExp.body)
            );
        }
        return of(new CityExp());
    }
}

export const cityExpRoute: Routes = [
    {
        path: '',
        component: CityExpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CityExpDetailComponent,
        resolve: {
            cityExp: CityExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CityExpUpdateComponent,
        resolve: {
            cityExp: CityExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CityExpUpdateComponent,
        resolve: {
            cityExp: CityExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityExps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityExpPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CityExpDeletePopupComponent,
        resolve: {
            cityExp: CityExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityExps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
