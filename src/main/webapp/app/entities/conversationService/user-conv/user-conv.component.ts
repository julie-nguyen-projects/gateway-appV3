import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';
import { AccountService } from 'app/core';
import { UserConvService } from './user-conv.service';

@Component({
    selector: 'jhi-user-conv',
    templateUrl: './user-conv.component.html'
})
export class UserConvComponent implements OnInit, OnDestroy {
    userConvs: IUserConv[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userConvService: UserConvService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userConvService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserConv[]>) => res.ok),
                map((res: HttpResponse<IUserConv[]>) => res.body)
            )
            .subscribe(
                (res: IUserConv[]) => {
                    this.userConvs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserConvs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserConv) {
        return item.id;
    }

    registerChangeInUserConvs() {
        this.eventSubscriber = this.eventManager.subscribe('userConvListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
