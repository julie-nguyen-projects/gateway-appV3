import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpUser } from 'app/shared/model/ExperienceService/exp-user.model';
import { ExpUserService } from './exp-user.service';

@Component({
    selector: 'jhi-exp-user-delete-dialog',
    templateUrl: './exp-user-delete-dialog.component.html'
})
export class ExpUserDeleteDialogComponent {
    expUser: IExpUser;

    constructor(protected expUserService: ExpUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.expUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expUserListModification',
                content: 'Deleted an expUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-exp-user-delete-popup',
    template: ''
})
export class ExpUserDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExpUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.expUser = expUser;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/exp-user', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/exp-user', { outlets: { popup: null } }]);
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
