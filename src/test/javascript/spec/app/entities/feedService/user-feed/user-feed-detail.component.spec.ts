/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserFeedDetailComponent } from 'app/entities/feedService/user-feed/user-feed-detail.component';
import { UserFeed } from 'app/shared/model/feedService/user-feed.model';

describe('Component Tests', () => {
    describe('UserFeed Management Detail Component', () => {
        let comp: UserFeedDetailComponent;
        let fixture: ComponentFixture<UserFeedDetailComponent>;
        const route = ({ data: of({ userFeed: new UserFeed('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserFeedDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserFeedDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserFeedDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userFeed).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
