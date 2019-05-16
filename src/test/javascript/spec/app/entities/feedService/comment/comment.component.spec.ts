/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Epikedin2TestModule } from '../../../../test.module';
import { CommentComponent } from 'app/entities/feedService/comment/comment.component';
import { CommentService } from 'app/entities/feedService/comment/comment.service';
import { Comment } from 'app/shared/model/feedService/comment.model';

describe('Component Tests', () => {
    describe('Comment Management Component', () => {
        let comp: CommentComponent;
        let fixture: ComponentFixture<CommentComponent>;
        let service: CommentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Epikedin2TestModule],
                declarations: [CommentComponent],
                providers: []
            })
                .overrideTemplate(CommentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Comment('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.comments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
