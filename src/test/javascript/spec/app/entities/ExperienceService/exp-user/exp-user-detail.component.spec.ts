/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { ExpUserDetailComponent } from 'app/entities/ExperienceService/exp-user/exp-user-detail.component';
import { ExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

describe('Component Tests', () => {
    describe('ExpUser Management Detail Component', () => {
        let comp: ExpUserDetailComponent;
        let fixture: ComponentFixture<ExpUserDetailComponent>;
        const route = ({ data: of({ expUser: new ExpUser('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [ExpUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExpUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.expUser).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
