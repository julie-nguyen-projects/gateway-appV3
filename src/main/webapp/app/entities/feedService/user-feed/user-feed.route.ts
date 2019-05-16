import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserFeedService } from './user-feed.service';
import { UserFeedComponent } from './user-feed.component';
import { UserFeedDetailComponent } from './user-feed-detail.component';
import { UserFeedUpdateComponent } from './user-feed-update.component';
import { UserFeedDeletePopupComponent } from './user-feed-delete-dialog.component';
import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';

@Injectable({ providedIn: 'root' })
export class UserFeedResolve implements Resolve<IUserFeed> {
    constructor(private service: UserFeedService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserFeed> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserFeed>) => response.ok),
                map((userFeed: HttpResponse<UserFeed>) => userFeed.body)
            );
        }
        return of(new UserFeed());
    }
}

export const userFeedRoute: Routes = [
    {
        path: '',
        component: UserFeedComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFeeds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserFeedDetailComponent,
        resolve: {
            userFeed: UserFeedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFeeds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserFeedUpdateComponent,
        resolve: {
            userFeed: UserFeedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFeeds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserFeedUpdateComponent,
        resolve: {
            userFeed: UserFeedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFeeds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFeedPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserFeedDeletePopupComponent,
        resolve: {
            userFeed: UserFeedResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFeeds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
