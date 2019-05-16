/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Epikedin2TestModule } from '../../../../test.module';
import { CityExpDeleteDialogComponent } from 'app/entities/ExperienceService/city-exp/city-exp-delete-dialog.component';
import { CityExpService } from 'app/entities/ExperienceService/city-exp/city-exp.service';

describe('Component Tests', () => {
    describe('CityExp Management Delete Component', () => {
        let comp: CityExpDeleteDialogComponent;
        let fixture: ComponentFixture<CityExpDeleteDialogComponent>;
        let service: CityExpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CityExpDeleteDialogComponent]
            })
                .overrideTemplate(CityExpDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CityExpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityExpService);
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
