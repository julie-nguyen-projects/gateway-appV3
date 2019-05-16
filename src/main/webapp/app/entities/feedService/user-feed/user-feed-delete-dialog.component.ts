import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserFeed } from 'app/shared/model/feedService/user-feed.model';
import { UserFeedService } from './user-feed.service';

@Component({
    selector: 'jhi-user-feed-delete-dialog',
    templateUrl: './user-feed-delete-dialog.component.html'
})
export class UserFeedDeleteDialogComponent {
    userFeed: IUserFeed;

    constructor(protected userFeedService: UserFeedService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.userFeedService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userFeedListModification',
                content: 'Deleted an userFeed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-feed-delete-popup',
    template: ''
})
export class UserFeedDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userFeed }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserFeedDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userFeed = userFeed;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-feed', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-feed', { outlets: { popup: null } }]);
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
