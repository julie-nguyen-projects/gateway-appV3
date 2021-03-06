import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';
import { ExpUserService } from './exp-user.service';

@Component({
    selector: 'jhi-exp-user-update',
    templateUrl: './exp-user-update.component.html'
})
export class ExpUserUpdateComponent implements OnInit {
    expUser: IExpUser;
    isSaving: boolean;

    constructor(protected expUserService: ExpUserService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expUser }) => {
            this.expUser = expUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.expUser.id !== undefined) {
            this.subscribeToSaveResponse(this.expUserService.update(this.expUser));
        } else {
            this.subscribeToSaveResponse(this.expUserService.create(this.expUser));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpUser>>) {
        result.subscribe((res: HttpResponse<IExpUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
