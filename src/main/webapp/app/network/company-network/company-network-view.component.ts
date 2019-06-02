import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ICompany} from 'app/shared/model/ExperienceService/company.model';

@Component({
    selector: 'jhi-company-network-view',
    templateUrl: './company-network-view.component.html',
    styles: []
})
export class CompanyNetworkViewComponent implements OnInit {

    company: ICompany;

    constructor(protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }
}
