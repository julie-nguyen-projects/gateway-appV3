import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserConv } from 'app/shared/model/conversationService/user-conv.model';
import { UserConvService } from './user-conv.service';

@Component({
    selector: 'jhi-user-conv-delete-dialog',
    templateUrl: './user-conv-delete-dialog.component.html'
})
export class UserConvDeleteDialogComponent {
    userConv: IUserConv;

    constructor(protected userConvService: UserConvService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.userConvService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userConvListModification',
                content: 'Deleted an userConv'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-conv-delete-popup',
    template: ''
})
export class UserConvDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userConv }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserConvDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userConv = userConv;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-conv', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-conv', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
