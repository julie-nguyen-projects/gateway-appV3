/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { ExpUserComponent } from 'app/entities/ExperienceService/exp-user/exp-user.component';
import { ExpUserService } from 'app/entities/ExperienceService/exp-user/exp-user.service';
import { ExpUser } from 'app/shared/model/ExperienceService/exp-user.model';

describe('Component Tests', () => {
    describe('ExpUser Management Component', () => {
        let comp: ExpUserComponent;
        let fixture: ComponentFixture<ExpUserComponent>;
        let service: ExpUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [ExpUserComponent],
                providers: []
            })
                .overrideTemplate(ExpUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExpUser('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.expUsers[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
