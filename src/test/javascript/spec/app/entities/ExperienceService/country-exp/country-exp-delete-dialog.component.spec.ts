/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Epikedin2TestModule } from '../../../../test.module';
import { CountryExpDeleteDialogComponent } from 'app/entities/ExperienceService/country-exp/country-exp-delete-dialog.component';
import { CountryExpService } from 'app/entities/ExperienceService/country-exp/country-exp.service';

describe('Component Tests', () => {
    describe('CountryExp Management Delete Component', () => {
        let comp: CountryExpDeleteDialogComponent;
        let fixture: ComponentFixture<CountryExpDeleteDialogComponent>;
        let service: CountryExpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CountryExpDeleteDialogComponent]
            })
                .overrideTemplate(CountryExpDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryExpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryExpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
