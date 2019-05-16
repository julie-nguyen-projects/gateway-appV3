import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    SchoolComponent,
    SchoolDetailComponent,
    SchoolUpdateComponent,
    SchoolDeletePopupComponent,
    SchoolDeleteDialogComponent,
    schoolRoute,
    schoolPopupRoute
} from './';

const ENTITY_STATES = [...schoolRoute, ...schoolPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SchoolComponent, SchoolDetailComponent, SchoolUpdateComponent, SchoolDeleteDialogComponent, SchoolDeletePopupComponent],
    entryComponents: [SchoolComponent, SchoolUpdateComponent, SchoolDeleteDialogComponent, SchoolDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceServiceSchoolModule {}
