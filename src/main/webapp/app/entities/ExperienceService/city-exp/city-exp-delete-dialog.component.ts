import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICityExp } from 'app/shared/model/ExperienceService/city-exp.model';
import { CityExpService } from './city-exp.service';

@Component({
    selector: 'jhi-city-exp-delete-dialog',
    templateUrl: './city-exp-delete-dialog.component.html'
})
export class CityExpDeleteDialogComponent {
    cityExp: ICityExp;

    constructor(protected cityExpService: CityExpService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.cityExpService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cityExpListModification',
                content: 'Deleted an cityExp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-city-exp-delete-popup',
    template: ''
})
export class CityExpDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cityExp }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CityExpDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cityExp = cityExp;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/city-exp', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/city-exp', { outlets: { popup: null } }]);
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
