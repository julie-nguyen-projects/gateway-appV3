/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { CountryExpUpdateComponent } from 'app/entities/ExperienceService/country-exp/country-exp-update.component';
import { CountryExpService } from 'app/entities/ExperienceService/country-exp/country-exp.service';
import { CountryExp } from 'app/shared/model/ExperienceService/country-exp.model';

describe('Component Tests', () => {
    describe('CountryExp Management Update Component', () => {
        let comp: CountryExpUpdateComponent;
        let fixture: ComponentFixture<CountryExpUpdateComponent>;
        let service: CountryExpService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CountryExpUpdateComponent]
            })
                .overrideTemplate(CountryExpUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryExpUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryExpService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CountryExp('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countryExp = entity;
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
                    const entity = new CountryExp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countryExp = entity;
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
