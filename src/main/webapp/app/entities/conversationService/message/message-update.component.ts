import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMessage } from 'app/shared/model/conversationService/message.model';
import { MessageService } from './message.service';
import { IConversation } from 'app/shared/model/conversationService/conversation.model';
import { ConversationService } from 'app/entities/conversationService/conversation';
import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';
import { UserConvService } from 'app/entities/conversationService/user-conv';

@Component({
    selector: 'jhi-message-update',
    templateUrl: './message-update.component.html'
})
export class MessageUpdateComponent implements OnInit {
    message: IMessage;
    isSaving: boolean;

    conversations: IConversation[];

    userconvs: IUserConv[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected messageService: MessageService,
        protected conversationService: ConversationService,
        protected userConvService: UserConvService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ message }) => {
            this.message = message;
        });
        this.conversationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IConversation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IConversation[]>) => response.body)
            )
            .subscribe((res: IConversation[]) => (this.conversations = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.message.id !== undefined) {
            this.subscribeToSaveResponse(this.messageService.update(this.message));
        } else {
            this.subscribeToSaveResponse(this.messageService.create(this.message));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessage>>) {
        result.subscribe((res: HttpResponse<IMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackConversationById(index: number, item: IConversation) {
        return item.id;
    }

    trackUserConvById(index: number, item: IUserConv) {
        return item.id;
    }
}
