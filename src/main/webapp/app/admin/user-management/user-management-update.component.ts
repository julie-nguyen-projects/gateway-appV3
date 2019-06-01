import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from 'app/core';
import { UserExtraService } from 'app/entities/user-extra';
import { UserExtra } from 'app/shared/model/user-extra.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    userExtra: UserExtra;
    languages: any[];
    authorities: any[];
    isSaving: boolean;
    city: ICity;
    cities: ICity[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected elementRef: ElementRef,
        protected cityService: CityService,
        private userService: UserService,
        private userExtraService: UserExtraService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.userExtraService.find(this.user.id).subscribe(userExtra => {
            this.userExtra = userExtra.body;
            this.cityService.find(this.userExtra.cityId).subscribe(
                found => {
                    this.city = found.body;
                },
                err => {
                    this.onError(err.message);
                }
            );
        });

        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.userExtra.firstName = this.user.firstName;
        this.userExtra.lastName = this.user.lastName;
        this.userExtra.email = this.user.email;
        this.userExtra.cityId = this.city.id;
        this.userExtra.cityName = this.city.name;

        if (this.user.id !== null) {
            this.userExtraService.update(this.userExtra).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.user.langKey = 'en';
            this.userExtraService.create(this.userExtra).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.userExtra, this.elementRef, field, fieldContentType, idInput);
    }

    search(event: any) {
        this.cityService
            .getCitiesByNameStartsWith(event.query)
            .pipe(
                filter((mayBeOk: HttpResponse<ICity[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICity[]>) => response.body)
            )
            .subscribe((res: ICity[]) => (this.cities = res), (res: HttpErrorResponse) => this.onError(res.message));
    }
}
