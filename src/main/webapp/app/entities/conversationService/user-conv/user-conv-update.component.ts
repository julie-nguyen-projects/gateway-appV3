import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';
import { UserConvService } from './user-conv.service';
import { IConversation } from 'app/shared/model/conversationService/conversation.model';
import { ConversationService } from 'app/entities/conversationService/conversation';

@Component({
    selector: 'jhi-user-conv-update',
    templateUrl: './user-conv-update.component.html'
})
export class UserConvUpdateComponent implements OnInit {
    userConv: IUserConv;
    isSaving: boolean;

    conversations: IConversation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userConvService: UserConvService,
        protected conversationService: ConversationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userConv }) => {
            this.userConv = userConv;
        });
        this.conversationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IConversation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IConversation[]>) => response.body)
            )
            .subscribe((res: IConversation[]) => (this.conversations = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userConv.id !== undefined) {
            this.subscribeToSaveResponse(this.userConvService.update(this.userConv));
        } else {
            this.subscribeToSaveResponse(this.userConvService.create(this.userConv));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserConv>>) {
        result.subscribe((res: HttpResponse<IUserConv>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
