import {Component, OnInit} from '@angular/core';
import {IUserExtra, UserExtra} from 'app/shared/model/user-extra.model';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {UserExtraService} from 'app/entities/user-extra';
import {JhiAlertService} from 'ng-jhipster';
import {IUser, User} from 'app/core';
import {Company, ICompany} from 'app/shared/model/ExperienceService/company.model';
import {CompanyService} from 'app/entities/ExperienceService/company';

@Component({
    selector: 'jhi-home-network',
    templateUrl: './home-network.component.html',
    styles: []
})
export class HomeNetworkComponent implements OnInit {
    searchedUser: IUser;
    users: IUserExtra[];
    searchedCompany: ICompany;
    companies: ICompany[];

    constructor(
        private userExtraService: UserExtraService,
        private companyService: CompanyService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.searchedUser = new UserExtra();
        this.searchedCompany = new Company();
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

    searchCompanies() {
        console.log(this.searchedCompany.name);
        this.companyService.getByNameContains(this.searchedCompany.name)
            .pipe(
                filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompany[]>) => response.body)
            ).subscribe((res: ICompany[]) => { this.companies = res; },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    trackIdentity(index, item: User) {
        return item.id;
    }

    trackIdentityCompany(index, item: Company) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
