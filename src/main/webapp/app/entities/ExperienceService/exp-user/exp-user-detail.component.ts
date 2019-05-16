import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

@Component({
    selector: 'jhi-exp-user-detail',
    templateUrl: './exp-user-detail.component.html'
})
export class ExpUserDetailComponent implements OnInit {
    expUser: IExpUser;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expUser }) => {
            this.expUser = expUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
