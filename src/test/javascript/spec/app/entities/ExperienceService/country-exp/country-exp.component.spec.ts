/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { CountryExpComponent } from 'app/entities/ExperienceService/country-exp/country-exp.component';
import { CountryExpService } from 'app/entities/ExperienceService/country-exp/country-exp.service';
import { CountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

describe('Component Tests', () => {
    describe('CountryExp Management Component', () => {
        let comp: CountryExpComponent;
        let fixture: ComponentFixture<CountryExpComponent>;
        let service: CountryExpService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CountryExpComponent],
                providers: []
            })
                .overrideTemplate(CountryExpComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryExpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryExpService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CountryExp('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.countryExps[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
