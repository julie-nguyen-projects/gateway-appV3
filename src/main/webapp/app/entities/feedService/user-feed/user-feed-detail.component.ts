import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';

@Component({
    selector: 'jhi-user-feed-detail',
    templateUrl: './user-feed-detail.component.html'
})
export class UserFeedDetailComponent implements OnInit {
    userFeed: IUserFeed;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userFeed }) => {
            this.userFeed = userFeed;
        });
    }

    previousState() {
        window.history.back();
    }
}
