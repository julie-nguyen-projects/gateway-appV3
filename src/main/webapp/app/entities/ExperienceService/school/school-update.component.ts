import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISchool } from 'app/shared/model/ExperienceService/school.model';
import { SchoolService } from './school.service';
import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { CityExpService } from 'app/entities/ExperienceService/city-exp';

@Component({
    selector: 'jhi-school-update',
    templateUrl: './school-update.component.html'
})
export class SchoolUpdateComponent implements OnInit {
    school: ISchool;
    isSaving: boolean;

    cityexps: ICityExp[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected schoolService: SchoolService,
        protected cityExpService: CityExpService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ school }) => {
            this.school = school;
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
        if (this.school.id !== undefined) {
            this.subscribeToSaveResponse(this.schoolService.update(this.school));
        } else {
            this.subscribeToSaveResponse(this.schoolService.create(this.school));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchool>>) {
        result.subscribe((res: HttpResponse<ISchool>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
