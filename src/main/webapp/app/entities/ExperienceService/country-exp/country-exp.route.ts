import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CountryExp } from 'app/shared/model/ExperienceService/country-exp.model';
import { CountryExpService } from './country-exp.service';
import { CountryExpComponent } from './country-exp.component';
import { CountryExpDetailComponent } from './country-exp-detail.component';
import { CountryExpUpdateComponent } from './country-exp-update.component';
import { CountryExpDeletePopupComponent } from './country-exp-delete-dialog.component';
import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

@Injectable({ providedIn: 'root' })
export class CountryExpResolve implements Resolve<ICountryExp> {
    constructor(private service: CountryExpService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICountryExp> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CountryExp>) => response.ok),
                map((countryExp: HttpResponse<CountryExp>) => countryExp.body)
            );
        }
        return of(new CountryExp());
    }
}

export const countryExpRoute: Routes = [
    {
        path: '',
        component: CountryExpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CountryExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CountryExpDetailComponent,
        resolve: {
            countryExp: CountryExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CountryExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CountryExpUpdateComponent,
        resolve: {
            countryExp: CountryExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CountryExps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CountryExpUpdateComponent,
        resolve: {
            countryExp: CountryExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CountryExps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryExpPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CountryExpDeletePopupComponent,
        resolve: {
            countryExp: CountryExpResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CountryExps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
