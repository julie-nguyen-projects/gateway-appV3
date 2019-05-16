/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { UserConvComponent } from 'app/entities/conversationService/user-conv/user-conv.component';
import { UserConvService } from 'app/entities/conversationService/user-conv/user-conv.service';
import { UserConv } from 'app/shared/model/conversationService/user-conv.model';

describe('Component Tests', () => {
    describe('UserConv Management Component', () => {
        let comp: UserConvComponent;
        let fixture: ComponentFixture<UserConvComponent>;
        let service: UserConvService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [UserConvComponent],
                providers: []
            })
                .overrideTemplate(UserConvComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserConvComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserConvService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserConv('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userConvs[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
