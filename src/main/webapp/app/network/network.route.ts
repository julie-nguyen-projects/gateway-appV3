import {Routes} from '@angular/router';
import {UserRouteAccessService} from 'app/core';
import {HomeNetworkComponent} from 'app/network/home-network/home-network.component';
import {CompanyResolve} from 'app/entities/ExperienceService/company';
import {CompanyNetworkViewComponent} from 'app/network/company-network/company-network-view.component';
import {SchoolDetailComponent, SchoolResolve} from 'app/entities/ExperienceService/school';
import {SchoolNetworkViewComponent} from 'app/network/school-network/school-network-view.component';

const NETWORK_ROUTES = [];

export const networkState: Routes = [
    {
        path: '',
        component: HomeNetworkComponent,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        children: NETWORK_ROUTES
    },
    {
        path: 'network-school/:id/view',
        component: SchoolNetworkViewComponent,
        resolve: {
            school: SchoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schools'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'network-company/:id/view',
        component: CompanyNetworkViewComponent,
        resolve: {
            company: CompanyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Companies'
        },
        canActivate: [UserRouteAccessService]
    },
];
