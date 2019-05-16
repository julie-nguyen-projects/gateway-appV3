/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserFeedComponent } from 'app/entities/feedService/user-feed/user-feed.component';
import { UserFeedService } from 'app/entities/feedService/user-feed/user-feed.service';
import { UserFeed } from 'app/shared/model/feedService/user-feed.model';

describe('Component Tests', () => {
    describe('UserFeed Management Component', () => {
        let comp: UserFeedComponent;
        let fixture: ComponentFixture<UserFeedComponent>;
        let service: UserFeedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserFeedComponent],
                providers: []
            })
                .overrideTemplate(UserFeedComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserFeedComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFeedService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserFeed('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userFeeds[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
