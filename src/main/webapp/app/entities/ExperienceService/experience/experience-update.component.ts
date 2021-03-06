import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService} from 'ng-jhipster';
import {IExperience, Type} from 'app/shared/model/ExperienceService/experience.model';
import {ExperienceService} from './experience.service';
import {IExpUser} from 'app/shared/model/ExperienceService/exp-user.model';
import {ExpUserService} from 'app/entities/ExperienceService/exp-user';
import {ICompany} from 'app/shared/model/ExperienceService/company.model';
import {CompanyService} from 'app/entities/ExperienceService/company';
import {ISchool} from 'app/shared/model/ExperienceService/school.model';
import {SchoolService} from 'app/entities/ExperienceService/school';
import {AccountService} from 'app/core';

@Component({
    selector: 'jhi-experience-update',
    templateUrl: './experience-update.component.html'
})
export class ExperienceUpdateComponent implements OnInit {
    experience: IExperience;
    isSaving: boolean;

    expusers: IExpUser[];

    companies: ICompany[];

    schools: ISchool[];
    beginningDateDp: any;
    endingDateDp: any;
    account: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected experienceService: ExperienceService,
        protected expUserService: ExpUserService,
        protected companyService: CompanyService,
        protected schoolService: SchoolService,
        protected activatedRoute: ActivatedRoute,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ experience }) => {
            this.experience = experience;
        });
        this.accountService.identity().then(account => {
            this.account = this.copyAccount(account);
        }).then(() => {
            this.expUserService
                .query()
                .pipe(
                    filter((mayBeOk: HttpResponse<IExpUser[]>) => mayBeOk.ok),
                    map((response: HttpResponse<IExpUser[]>) => response.body)
                )
                .subscribe((res: IExpUser[]) => (this.expusers = res), (res: HttpErrorResponse) => this.onError(res.message));
            this.companyService
                .query()
                .pipe(
                    filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
                    map((response: HttpResponse<ICompany[]>) => response.body)
                )
                .subscribe((res: ICompany[]) => (this.companies = res), (res: HttpErrorResponse) => this.onError(res.message));
            this.schoolService
                .query()
                .pipe(
                    filter((mayBeOk: HttpResponse<ISchool[]>) => mayBeOk.ok),
                    map((response: HttpResponse<ISchool[]>) => response.body)
                )
                .subscribe((res: ISchool[]) => (this.schools = res), (res: HttpErrorResponse) => this.onError(res.message));
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.experience.userId = this.account.id;
        if (this.experience.id !== undefined) {
            this.subscribeToSaveResponse(this.experienceService.update(this.experience));
        } else {
            this.subscribeToSaveResponse(this.experienceService.create(this.experience));
        }
    }

    get isJob() {
        return this.experience.type === Type.JOB;
    }

    get isFormation() {
        return this.experience.type === Type.FORMATION;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperience>>) {
        result.subscribe((res: HttpResponse<IExperience>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackExpUserById(index: number, item: IExpUser) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackSchoolById(index: number, item: ISchool) {
        return item.id;
    }

    private copyAccount(account: any) {
        return {
            id: account.id
        };
    }
}
