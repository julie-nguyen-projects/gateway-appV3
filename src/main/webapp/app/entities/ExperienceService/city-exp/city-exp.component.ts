import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { AccountService } from 'app/core';
import { CityExpService } from './city-exp.service';

@Component({
    selector: 'jhi-city-exp',
    templateUrl: './city-exp.component.html'
})
export class CityExpComponent implements OnInit, OnDestroy {
    cityExps: ICityExp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cityExpService: CityExpService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cityExpService
            .query()
            .pipe(
                filter((res: HttpResponse<ICityExp[]>) => res.ok),
                map((res: HttpResponse<ICityExp[]>) => res.body)
            )
            .subscribe(
                (res: ICityExp[]) => {
                    this.cityExps = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCityExps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICityExp) {
        return item.id;
    }

    registerChangeInCityExps() {
        this.eventSubscriber = this.eventManager.subscribe('cityExpListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
