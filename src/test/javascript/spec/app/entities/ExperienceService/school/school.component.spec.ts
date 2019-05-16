/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { SchoolComponent } from 'app/entities/ExperienceService/school/school.component';
import { SchoolService } from 'app/entities/ExperienceService/school/school.service';
import { School } from 'app/shared/model/ExperienceService/school.model';

describe('Component Tests', () => {
    describe('School Management Component', () => {
        let comp: SchoolComponent;
        let fixture: ComponentFixture<SchoolComponent>;
        let service: SchoolService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [SchoolComponent],
                providers: []
            })
                .overrideTemplate(SchoolComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SchoolComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new School('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.schools[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
