import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    UserExtraComponent,
    UserExtraDetailComponent,
    UserExtraUpdateComponent,
    UserExtraDeletePopupComponent,
    UserExtraDeleteDialogComponent,
    userExtraRoute,
    userExtraPopupRoute
} from './';

const ENTITY_STATES = [...userExtraRoute, ...userExtraPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserExtraComponent,
        UserExtraDetailComponent,
        UserExtraUpdateComponent,
        UserExtraDeleteDialogComponent,
        UserExtraDeletePopupComponent
    ],
    entryComponents: [UserExtraComponent, UserExtraUpdateComponent, UserExtraDeleteDialogComponent, UserExtraDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Epikedin2UserExtraModule {}
