import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExperience } from 'app/shared/model/ExperienceService/experience.model';
import { AccountService } from 'app/core';
import { ExperienceService } from './experience.service';

@Component({
    selector: 'jhi-experience',
    templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit, OnDestroy {
    experiences: IExperience[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected experienceService: ExperienceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.experienceService
            .query()
            .pipe(
                filter((res: HttpResponse<IExperience[]>) => res.ok),
                map((res: HttpResponse<IExperience[]>) => res.body)
            )
            .subscribe(
                (res: IExperience[]) => {
                    this.experiences = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExperiences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExperience) {
        return item.id;
    }

    registerChangeInExperiences() {
        this.eventSubscriber = this.eventManager.subscribe('experienceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
