/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserFeedUpdateComponent } from 'app/entities/feedService/user-feed/user-feed-update.component';
import { UserFeedService } from 'app/entities/feedService/user-feed/user-feed.service';
import { UserFeed } from 'app/shared/model/feedService/user-feed.model';

describe('Component Tests', () => {
    describe('UserFeed Management Update Component', () => {
        let comp: UserFeedUpdateComponent;
        let fixture: ComponentFixture<UserFeedUpdateComponent>;
        let service: UserFeedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserFeedUpdateComponent]
            })
                .overrideTemplate(UserFeedUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserFeedUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFeedService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserFeed('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userFeed = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserFeed();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userFeed = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
