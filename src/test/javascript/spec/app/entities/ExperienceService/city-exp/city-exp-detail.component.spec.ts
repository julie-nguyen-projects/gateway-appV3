/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Epikedin2TestModule } from '../../../../test.module';
import { CityExpDetailComponent } from 'app/entities/ExperienceService/city-exp/city-exp-detail.component';
import { CityExp } from 'app/shared/model/ExperienceService/city-exp.model';

describe('Component Tests', () => {
    describe('CityExp Management Detail Component', () => {
        let comp: CityExpDetailComponent;
        let fixture: ComponentFixture<CityExpDetailComponent>;
        const route = ({ data: of({ cityExp: new CityExp('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CityExpDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CityExpDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CityExpDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cityExp).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
