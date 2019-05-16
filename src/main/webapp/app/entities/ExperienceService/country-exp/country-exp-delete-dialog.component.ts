import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryExp } from 'app/shared/model/ExperienceService/country-exp.model';
import { CountryExpService } from './country-exp.service';

@Component({
    selector: 'jhi-country-exp-delete-dialog',
    templateUrl: './country-exp-delete-dialog.component.html'
})
export class CountryExpDeleteDialogComponent {
    countryExp: ICountryExp;

    constructor(
        protected countryExpService: CountryExpService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.countryExpService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'countryExpListModification',
                content: 'Deleted an countryExp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-exp-delete-popup',
    template: ''
})
export class CountryExpDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countryExp }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CountryExpDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.countryExp = countryExp;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/country-exp', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/country-exp', { outlets: { popup: null } }]);
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
