import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserFeedService } from './user-feed.service';

@Component({
    selector: 'jhi-user-feed-update',
    templateUrl: './user-feed-update.component.html'
})
export class UserFeedUpdateComponent implements OnInit {
    userFeed: IUserFeed;
    isSaving: boolean;

    constructor(protected userFeedService: UserFeedService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userFeed }) => {
            this.userFeed = userFeed;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userFeed.id !== undefined) {
            this.subscribeToSaveResponse(this.userFeedService.update(this.userFeed));
        } else {
            this.subscribeToSaveResponse(this.userFeedService.create(this.userFeed));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserFeed>>) {
        result.subscribe((res: HttpResponse<IUserFeed>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
