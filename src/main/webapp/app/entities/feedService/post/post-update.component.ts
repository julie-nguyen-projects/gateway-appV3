import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPost } from 'app/shared/model/feedService/post.model';
import { PostService } from './post.service';
import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserFeedService } from 'app/entities/feedService/user-feed';

@Component({
    selector: 'jhi-post-update',
    templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
    post: IPost;
    isSaving: boolean;

    userfeeds: IUserFeed[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected postService: PostService,
        protected userFeedService: UserFeedService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ post }) => {
            this.post = post;
        });
        this.userFeedService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserFeed[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserFeed[]>) => response.body)
            )
            .subscribe((res: IUserFeed[]) => (this.userfeeds = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.post.id !== undefined) {
            this.subscribeToSaveResponse(this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(this.postService.create(this.post));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
        result.subscribe((res: HttpResponse<IPost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserFeedById(index: number, item: IUserFeed) {
        return item.id;
    }
}
