import { Component, ElementRef, OnInit } from '@angular/core';

import { AccountService, IUser } from 'app/core';
import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { CityService } from 'app/entities/city';
import { ICity } from 'app/shared/model/city.model';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-settings',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    userExtra: IUserExtra;
    city: ICity;
    cities: ICity[];
    languages: any[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected elementRef: ElementRef,
        private accountService: AccountService,
        protected cityService: CityService,
        private userExtraService: UserExtraService
    ) {}

    ngOnInit() {
        this.accountService
            .identity()
            .then(account => {
                this.settingsAccount = this.copyAccount(account);
            })
            .then(() => {
                this.userExtraService.find(this.settingsAccount.id).subscribe(
                    res => {
                        this.userExtra = res.body;
                        this.cityService.find(this.userExtra.cityId).subscribe(
                            found => {
                                this.city = found.body;
                            },
                            err => {
                                this.onError(err.message);
                            }
                        );
                    },
                    err => {
                        this.onError(err.message);
                    }
                );
            });
    }

    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.accountService
                    .identity(true)
                    .then(account => {
                        this.settingsAccount = this.copyAccount(account);
                    })
                    .then(() => {
                        this.userExtra.firstName = this.settingsAccount.firstName;
                        this.userExtra.lastName = this.settingsAccount.lastName;
                        this.userExtra.email = this.settingsAccount.email;
                        this.userExtra.cityId = this.city.id;
                        this.userExtra.cityName = this.city.name;
                        this.userExtraService.update(this.userExtra).subscribe(
                            () => {
                                this.error = null;
                                this.success = 'OK';
                            },
                            () => {
                                this.success = null;
                                this.error = 'ERROR';
                            }
                        );
                    });
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
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

    trackCityById(index: number, item: ICity) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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
