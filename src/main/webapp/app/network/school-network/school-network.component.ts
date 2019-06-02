import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ISchool, School} from 'app/shared/model/ExperienceService/school.model';
import {SchoolService} from 'app/entities/ExperienceService/school';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-school-network',
    templateUrl: './school-network.component.html',
    styles: []
})
export class SchoolNetworkComponent implements OnInit {

    searchedSchool: ISchool;
    schools: ISchool[];

    constructor(
        private schoolService: SchoolService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.searchedSchool = new School();
    }

    searchSchools() {
        this.schoolService.getByNameContains(this.searchedSchool.name)
            .pipe(
                filter((mayBeOk: HttpResponse<ISchool[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchool[]>) => response.body)
            ).subscribe((res: ISchool[]) => { this.schools = res; },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    trackIdentitySchool(index, item: School) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    getAllSchools() {
        this.schoolService.query()
            .pipe(
                filter((res: HttpResponse<ISchool[]>) => res.ok),
                map((res: HttpResponse<ISchool[]>) => res.body)
            )
            .subscribe(
                (res: ISchool[]) => {
                    this.schools = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
}
