import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';
import { CountryExpService } from './country-exp.service';

@Component({
    selector: 'jhi-country-exp-update',
    templateUrl: './country-exp-update.component.html'
})
export class CountryExpUpdateComponent implements OnInit {
    countryExp: ICountryExp;
    isSaving: boolean;

    constructor(protected countryExpService: CountryExpService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ countryExp }) => {
            this.countryExp = countryExp;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.countryExp.id !== undefined) {
            this.subscribeToSaveResponse(this.countryExpService.update(this.countryExp));
        } else {
            this.subscribeToSaveResponse(this.countryExpService.create(this.countryExp));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryExp>>) {
        result.subscribe((res: HttpResponse<ICountryExp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
