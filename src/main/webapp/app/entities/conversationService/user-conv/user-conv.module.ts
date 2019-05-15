import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    UserConvComponent,
    UserConvDetailComponent,
    UserConvUpdateComponent,
    UserConvDeletePopupComponent,
    UserConvDeleteDialogComponent,
    userConvRoute,
    userConvPopupRoute
} from './';

const ENTITY_STATES = [...userConvRoute, ...userConvPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserConvComponent,
        UserConvDetailComponent,
        UserConvUpdateComponent,
        UserConvDeleteDialogComponent,
        UserConvDeletePopupComponent
    ],
    entryComponents: [UserConvComponent, UserConvUpdateComponent, UserConvDeleteDialogComponent, UserConvDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConversationServiceUserConvModule {}
