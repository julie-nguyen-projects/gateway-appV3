import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from 'app/core';
import { UserExtraService } from 'app/entities/user-extra';
import { UserExtra } from 'app/shared/model/user-extra.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { City, ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserConv } from 'app/shared/model/conversationService/user-conv.model';
import { ExpUser } from 'app/shared/model/ExperienceService/exp-user.model';
import { UserFeedService } from 'app/entities/feedService/user-feed';
import { UserConvService } from 'app/entities/conversationService/user-conv';
import { ExpUserService } from 'app/entities/ExperienceService/exp-user';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    userExtra: UserExtra;
    userFeed: UserFeed;
    userConv: UserConv;
    expUser: ExpUser;
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
        private userFeedService: UserFeedService,
        private userConvService: UserConvService,
        private expUserService: ExpUserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
            this.userExtraService.find(this.user.id).subscribe(userExtra => {
                this.userExtra = userExtra.body;
                this.cityService.find(this.userExtra.cityId).subscribe(
                    found => {
                        this.city = found.body;
                    },
                    err => {
                        this.userExtra = new UserExtra();
                        this.city = new City();
                    }
                );
            });
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
        if (this.userExtra.firstName != null) {
            this.userExtra.firstName = this.user.firstName;
        }
        if (this.userExtra.lastName != null) {
            this.userExtra.lastName = this.user.lastName;
        }
        if (this.userExtra.email != null) {
            this.userExtra.email = this.user.email;
        }
        if (this.city.name != null) {
            this.userExtra.cityId = this.city.id;
            this.userExtra.cityName = this.city.name;
        }
        if (this.user.id !== null) {
            this.userExtraService.update(this.userExtra).subscribe(() => console.log('userExtra ok'), err => this.onSaveError(err));
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), err => this.onSaveError(err));
        } else {
            this.user.langKey = 'en';
            this.userService.create(this.user).subscribe(
                response => {
                    this.userExtra.id = response.body.id;
                    this.userExtraService.create(this.userExtra).subscribe(() => console.log('userExtra ok'), err => this.onSaveError(err));
                    this.userFeedService
                        .create(this.userFeed, response.body.id)
                        .subscribe(() => console.log('userFeed ok'), err => this.onSaveError(err));
                    this.userConvService
                        .create(this.userConv, response.body.id)
                        .subscribe(() => console.log('userConv ok'), err => this.onSaveError(err));
                    this.expUserService
                        .create(this.expUser, response.body.id)
                        .subscribe(() => console.log('expUser ok'), err => this.onSaveError(err));
                    this.onSaveSuccess(response);
                },
                err => this.onSaveError(err)
            );
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError(err) {
        console.log(err);
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
