import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComment } from 'app/shared/model/feedService/comment.model';
import { CommentService } from './comment.service';
import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserFeedService } from 'app/entities/feedService/user-feed';
import { IPost } from 'app/shared/model/feedService/post.model';
import { PostService } from 'app/entities/feedService/post';

@Component({
    selector: 'jhi-comment-update',
    templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
    comment: IComment;
    isSaving: boolean;

    userfeeds: IUserFeed[];

    posts: IPost[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentService: CommentService,
        protected userFeedService: UserFeedService,
        protected postService: PostService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
        });
        this.userFeedService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserFeed[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserFeed[]>) => response.body)
            )
            .subscribe((res: IUserFeed[]) => (this.userfeeds = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.postService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPost[]>) => response.body)
            )
            .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
        result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPostById(index: number, item: IPost) {
        return item.id;
    }
}
