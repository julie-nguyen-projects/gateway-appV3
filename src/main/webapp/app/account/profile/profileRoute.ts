import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { ProfileComponent } from 'app/account';

export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Profile'
    },
    canActivate: [UserRouteAccessService]
};
