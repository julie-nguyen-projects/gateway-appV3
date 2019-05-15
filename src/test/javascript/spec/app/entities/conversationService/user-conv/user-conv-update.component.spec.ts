/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserConvUpdateComponent } from 'app/entities/conversationService/user-conv/user-conv-update.component';
import { UserConvService } from 'app/entities/conversationService/user-conv/user-conv.service';
import { UserConv } from 'app/shared/model/conversationService/user-conv.model';

describe('Component Tests', () => {
    describe('UserConv Management Update Component', () => {
        let comp: UserConvUpdateComponent;
        let fixture: ComponentFixture<UserConvUpdateComponent>;
        let service: UserConvService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserConvUpdateComponent]
            })
                .overrideTemplate(UserConvUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserConvUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserConvService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserConv('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userConv = entity;
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
                    const entity = new UserConv();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userConv = entity;
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
