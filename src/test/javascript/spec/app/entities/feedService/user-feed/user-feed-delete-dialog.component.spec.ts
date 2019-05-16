/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserFeedDeleteDialogComponent } from 'app/entities/feedService/user-feed/user-feed-delete-dialog.component';
import { UserFeedService } from 'app/entities/feedService/user-feed/user-feed.service';

describe('Component Tests', () => {
    describe('UserFeed Management Delete Component', () => {
        let comp: UserFeedDeleteDialogComponent;
        let fixture: ComponentFixture<UserFeedDeleteDialogComponent>;
        let service: UserFeedService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserFeedDeleteDialogComponent]
            })
                .overrideTemplate(UserFeedDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserFeedDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFeedService);
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
