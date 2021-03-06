import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICompany } from 'app/shared/model/ExperienceService/company.model';
import { CompanyService } from './company.service';
import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { CityExpService } from 'app/entities/ExperienceService/city-exp';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: ICompany;
    isSaving: boolean;

    cityexps: ICityExp[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyService: CompanyService,
        protected cityExpService: CityExpService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.cityExpService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICityExp[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICityExp[]>) => response.body)
            )
            .subscribe((res: ICityExp[]) => (this.cityexps = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    trackCityExpById(index: number, item: ICityExp) {
        return item.id;
    }
}
