import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

@Component({
    selector: 'jhi-country-exp-detail',
    templateUrl: './country-exp-detail.component.html'
})
export class CountryExpDetailComponent implements OnInit {
    countryExp: ICountryExp;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countryExp }) => {
            this.countryExp = countryExp;
        });
    }

    previousState() {
        window.history.back();
    }
}
