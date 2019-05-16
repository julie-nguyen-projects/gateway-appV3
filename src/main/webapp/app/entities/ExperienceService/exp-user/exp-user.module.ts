import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    ExpUserComponent,
    ExpUserDetailComponent,
    ExpUserUpdateComponent,
    ExpUserDeletePopupComponent,
    ExpUserDeleteDialogComponent,
    expUserRoute,
    expUserPopupRoute
} from './';

const ENTITY_STATES = [...expUserRoute, ...expUserPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpUserComponent,
        ExpUserDetailComponent,
        ExpUserUpdateComponent,
        ExpUserDeleteDialogComponent,
        ExpUserDeletePopupComponent
    ],
    entryComponents: [ExpUserComponent, ExpUserUpdateComponent, ExpUserDeleteDialogComponent, ExpUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceServiceExpUserModule {}
