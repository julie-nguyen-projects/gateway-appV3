import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';

@Component({
    selector: 'jhi-city-exp-detail',
    templateUrl: './city-exp-detail.component.html'
})
export class CityExpDetailComponent implements OnInit {
    cityExp: ICityExp;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cityExp }) => {
            this.cityExp = cityExp;
        });
    }

    previousState() {
        window.history.back();
    }
}
