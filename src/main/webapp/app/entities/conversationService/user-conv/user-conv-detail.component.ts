import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';

@Component({
    selector: 'jhi-user-conv-detail',
    templateUrl: './user-conv-detail.component.html'
})
export class UserConvDetailComponent implements OnInit {
    userConv: IUserConv;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userConv }) => {
            this.userConv = userConv;
        });
    }

    previousState() {
        window.history.back();
    }
}
