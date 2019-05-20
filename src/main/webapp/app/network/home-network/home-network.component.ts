import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {IUserExtra, UserExtra} from 'app/shared/model/user-extra.model';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ICity} from 'app/shared/model/city.model';
import {UserExtraService} from 'app/entities/user-extra';
import {JhiAlertService} from 'ng-jhipster';
import {IUser} from 'app/core';

@Component({
    selector: 'jhi-home-network',
    templateUrl: './home-network.component.html',
    styles: []
})
export class HomeNetworkComponent implements OnInit {
    searchedUser: IUser;
    users: IUser[];

    constructor(
        private userExtraService: UserExtraService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.searchedUser = new UserExtra();
    }

    searchUsers(event: any) {
        this.userExtraService
            .getUsersByNameOrFirstNameContains(event.query)
            .pipe(
                filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserExtra[]>) => response.body)
            )
            .subscribe((res: IUserExtra[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
