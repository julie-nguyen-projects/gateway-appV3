/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserConvDeleteDialogComponent } from 'app/entities/conversationService/user-conv/user-conv-delete-dialog.component';
import { UserConvService } from 'app/entities/conversationService/user-conv/user-conv.service';

describe('Component Tests', () => {
    describe('UserConv Management Delete Component', () => {
        let comp: UserConvDeleteDialogComponent;
        let fixture: ComponentFixture<UserConvDeleteDialogComponent>;
        let service: UserConvService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserConvDeleteDialogComponent]
            })
                .overrideTemplate(UserConvDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserConvDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserConvService);
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
