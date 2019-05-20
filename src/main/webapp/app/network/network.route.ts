import * as path from 'path';
import {Routes} from '@angular/router';
import {UserRouteAccessService} from 'app/core';
import {HomeNetworkComponent} from 'app/network/home-network/home-network.component';

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
    }
];
