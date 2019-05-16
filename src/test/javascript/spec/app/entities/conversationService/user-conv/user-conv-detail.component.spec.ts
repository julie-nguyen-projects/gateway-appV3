/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserConvDetailComponent } from 'app/entities/conversationService/user-conv/user-conv-detail.component';
import { UserConv } from 'app/shared/model/conversationService/user-conv.model';

describe('Component Tests', () => {
    describe('UserConv Management Detail Component', () => {
        let comp: UserConvDetailComponent;
        let fixture: ComponentFixture<UserConvDetailComponent>;
        const route = ({ data: of({ userConv: new UserConv('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserConvDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserConvDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserConvDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userConv).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
