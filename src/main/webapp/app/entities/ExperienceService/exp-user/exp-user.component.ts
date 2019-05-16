import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';
import { AccountService } from 'app/core';
import { ExpUserService } from './exp-user.service';

@Component({
    selector: 'jhi-exp-user',
    templateUrl: './exp-user.component.html'
})
export class ExpUserComponent implements OnInit, OnDestroy {
    expUsers: IExpUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected expUserService: ExpUserService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.expUserService
            .query()
            .pipe(
                filter((res: HttpResponse<IExpUser[]>) => res.ok),
                map((res: HttpResponse<IExpUser[]>) => res.body)
            )
            .subscribe(
                (res: IExpUser[]) => {
                    this.expUsers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExpUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExpUser) {
        return item.id;
    }

    registerChangeInExpUsers() {
        this.eventSubscriber = this.eventManager.subscribe('expUserListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
