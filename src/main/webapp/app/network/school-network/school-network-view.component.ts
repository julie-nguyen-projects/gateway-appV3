import { Component, OnInit } from '@angular/core';
import {ISchool} from 'app/shared/model/ExperienceService/school.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-school-network-view',
    templateUrl: './school-network-view.component.html',
    styles: []
})
export class SchoolNetworkViewComponent implements OnInit {

    school: ISchool;

    constructor(protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ school }) => {
            this.school = school;
        });
    }

    previousState() {
        window.history.back();
    }
}
