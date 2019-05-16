/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { ExpUserUpdateComponent } from 'app/entities/ExperienceService/exp-user/exp-user-update.component';
import { ExpUserService } from 'app/entities/ExperienceService/exp-user/exp-user.service';
import { ExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

describe('Component Tests', () => {
    describe('ExpUser Management Update Component', () => {
        let comp: ExpUserUpdateComponent;
        let fixture: ComponentFixture<ExpUserUpdateComponent>;
        let service: ExpUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [ExpUserUpdateComponent]
            })
                .overrideTemplate(ExpUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ExpUser('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.expUser = entity;
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
                    const entity = new ExpUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.expUser = entity;
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
