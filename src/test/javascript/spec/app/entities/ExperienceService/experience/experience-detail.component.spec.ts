/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { ExperienceDetailComponent } from 'app/entities/ExperienceService/experience/experience-detail.component';
import { Experience } from 'app/shared/model/ExperienceService/experience.model';

describe('Component Tests', () => {
    describe('Experience Management Detail Component', () => {
        let comp: ExperienceDetailComponent;
        let fixture: ComponentFixture<ExperienceDetailComponent>;
        const route = ({ data: of({ experience: new Experience('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [ExperienceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExperienceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExperienceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.experience).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
