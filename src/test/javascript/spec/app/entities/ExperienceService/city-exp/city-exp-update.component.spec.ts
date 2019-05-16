/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { CityExpUpdateComponent } from 'app/entities/ExperienceService/city-exp/city-exp-update.component';
import { CityExpService } from 'app/entities/ExperienceService/city-exp/city-exp.service';
import { CityExp } from 'app/shared/model/ExperienceService/city-exp.model';

describe('Component Tests', () => {
    describe('CityExp Management Update Component', () => {
        let comp: CityExpUpdateComponent;
        let fixture: ComponentFixture<CityExpUpdateComponent>;
        let service: CityExpService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CityExpUpdateComponent]
            })
                .overrideTemplate(CityExpUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CityExpUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityExpService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CityExp('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cityExp = entity;
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
                    const entity = new CityExp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cityExp = entity;
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
