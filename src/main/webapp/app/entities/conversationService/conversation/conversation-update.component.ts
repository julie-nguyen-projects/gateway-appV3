import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IConversation } from 'app/shared/model/conversationService/conversation.model';
import { ConversationService } from './conversation.service';
import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';
import { UserConvService } from 'app/entities/conversationService/user-conv';

@Component({
    selector: 'jhi-conversation-update',
    templateUrl: './conversation-update.component.html'
})
export class ConversationUpdateComponent implements OnInit {
    conversation: IConversation;
    isSaving: boolean;

    userconvs: IUserConv[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected conversationService: ConversationService,
        protected userConvService: UserConvService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conversation }) => {
            this.conversation = conversation;
        });
        this.userConvService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserConv[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserConv[]>) => response.body)
            )
            .subscribe((res: IUserConv[]) => (this.userconvs = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.conversation.id !== undefined) {
            this.subscribeToSaveResponse(this.conversationService.update(this.conversation));
        } else {
            this.subscribeToSaveResponse(this.conversationService.create(this.conversation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IConversation>>) {
        result.subscribe((res: HttpResponse<IConversation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserConvById(index: number, item: IUserConv) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
