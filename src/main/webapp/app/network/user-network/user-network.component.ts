import {Component, OnInit} from '@angular/core';
import {IUser, User} from 'app/core';
import {IUserExtra, UserExtra} from 'app/shared/model/user-extra.model';
import {UserExtraService} from 'app/entities/user-extra';
import {JhiAlertService} from 'ng-jhipster';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-user-network',
    templateUrl: './user-network.component.html',
    styles: []
})
export class UserNetworkComponent implements OnInit {

    searchedUser: IUser;
    users: IUserExtra[];

    constructor(
        private userExtraService: UserExtraService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.searchedUser = new UserExtra();
    }

    /**
     * Search users which firstname and lastname contain form values
     * @param event : form values
     */
    searchUsers() {
        this.userExtraService
            .getUsersByNameOrFirstNameContains(
                this.searchedUser.firstName,
                this.searchedUser.lastName
            ).pipe(
            filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
            map((response: HttpResponse<IUserExtra[]>) => response.body)
        ).subscribe((res: IUserExtra[]) => { this.users = res; },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    trackIdentity(index, item: User) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

}
