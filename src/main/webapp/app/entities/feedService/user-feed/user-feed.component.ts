import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';
import { AccountService } from 'app/core';
import { UserFeedService } from './user-feed.service';

@Component({
    selector: 'jhi-user-feed',
    templateUrl: './user-feed.component.html'
})
export class UserFeedComponent implements OnInit, OnDestroy {
    userFeeds: IUserFeed[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userFeedService: UserFeedService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userFeedService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserFeed[]>) => res.ok),
                map((res: HttpResponse<IUserFeed[]>) => res.body)
            )
            .subscribe(
                (res: IUserFeed[]) => {
                    this.userFeeds = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserFeeds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserFeed) {
        return item.id;
    }

    registerChangeInUserFeeds() {
        this.eventSubscriber = this.eventManager.subscribe('userFeedListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
