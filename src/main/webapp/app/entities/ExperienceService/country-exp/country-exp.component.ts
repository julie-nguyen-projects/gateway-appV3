import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';
import { AccountService } from 'app/core';
import { CountryExpService } from './country-exp.service';

@Component({
    selector: 'jhi-country-exp',
    templateUrl: './country-exp.component.html'
})
export class CountryExpComponent implements OnInit, OnDestroy {
    countryExps: ICountryExp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected countryExpService: CountryExpService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.countryExpService
            .query()
            .pipe(
                filter((res: HttpResponse<ICountryExp[]>) => res.ok),
                map((res: HttpResponse<ICountryExp[]>) => res.body)
            )
            .subscribe(
                (res: ICountryExp[]) => {
                    this.countryExps = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCountryExps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICountryExp) {
        return item.id;
    }

    registerChangeInCountryExps() {
        this.eventSubscriber = this.eventManager.subscribe('countryExpListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
