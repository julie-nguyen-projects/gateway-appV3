/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { CountryExpDetailComponent } from 'app/entities/ExperienceService/country-exp/country-exp-detail.component';
import { CountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

describe('Component Tests', () => {
    describe('CountryExp Management Detail Component', () => {
        let comp: CountryExpDetailComponent;
        let fixture: ComponentFixture<CountryExpDetailComponent>;
        const route = ({ data: of({ countryExp: new CountryExp('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CountryExpDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CountryExpDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryExpDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.countryExp).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
