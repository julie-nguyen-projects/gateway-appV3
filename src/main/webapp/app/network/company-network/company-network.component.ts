import { Component, OnInit } from '@angular/core';
import {Company, ICompany} from 'app/shared/model/ExperienceService/company.model';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CompanyService} from 'app/entities/ExperienceService/company';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-company-network',
    templateUrl: './company-network.component.html',
    styles: []
})
export class CompanyNetworkComponent implements OnInit {

    searchedCompany: ICompany;
    companies: ICompany[];

    constructor(
        private companyService: CompanyService,
        private jhiAlertService: JhiAlertService
     ) { }

    ngOnInit() {
        this.searchedCompany = new Company();
    }

    searchCompanies() {
        this.companyService.getByNameContains(this.searchedCompany.name)
            .pipe(
                filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompany[]>) => response.body)
            ).subscribe((res: ICompany[]) => { this.companies = res; },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    trackIdentityCompany(index, item: Company) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
