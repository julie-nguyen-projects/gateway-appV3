import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICompany } from 'app/shared/model/ExperienceService/company.model';
import { CompanyService } from './company.service';
import { ICity } from 'app/shared/model/ExperienceService/city.model';
import { CityService } from 'app/entities/ExperienceService/city';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: ICompany;
    isSaving: boolean;

    cities: ICity[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyService: CompanyService,
        protected cityService: CityService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.cityService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICity[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICity[]>) => response.body)
            )
            .subscribe((res: ICity[]) => (this.cities = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCityById(index: number, item: ICity) {
        return item.id;
    }
}
