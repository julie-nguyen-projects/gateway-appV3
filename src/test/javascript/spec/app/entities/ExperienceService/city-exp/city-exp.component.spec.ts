/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { CityExpComponent } from 'app/entities/ExperienceService/city-exp/city-exp.component';
import { CityExpService } from 'app/entities/ExperienceService/city-exp/city-exp.service';
import { CityExp } from 'app/shared/model/ExperienceService/city-exp.model';

describe('Component Tests', () => {
    describe('CityExp Management Component', () => {
        let comp: CityExpComponent;
        let fixture: ComponentFixture<CityExpComponent>;
        let service: CityExpService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CityExpComponent],
                providers: []
            })
                .overrideTemplate(CityExpComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CityExpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityExpService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CityExp('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cityExps[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
