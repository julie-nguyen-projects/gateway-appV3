import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { CityExpService } from './city-exp.service';
import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';
import { CountryExpService } from 'app/entities/ExperienceService/country-exp';

@Component({
    selector: 'jhi-city-exp-update',
    templateUrl: './city-exp-update.component.html'
})
export class CityExpUpdateComponent implements OnInit {
    cityExp: ICityExp;
    isSaving: boolean;

    countryexps: ICountryExp[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cityExpService: CityExpService,
        protected countryExpService: CountryExpService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cityExp }) => {
            this.cityExp = cityExp;
        });
        this.countryExpService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICountryExp[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICountryExp[]>) => response.body)
            )
            .subscribe((res: ICountryExp[]) => (this.countryexps = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cityExp.id !== undefined) {
            this.subscribeToSaveResponse(this.cityExpService.update(this.cityExp));
        } else {
            this.subscribeToSaveResponse(this.cityExpService.create(this.cityExp));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICityExp>>) {
        result.subscribe((res: HttpResponse<ICityExp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCountryExpById(index: number, item: ICountryExp) {
        return item.id;
    }
}
