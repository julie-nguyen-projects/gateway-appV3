import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    UserFeedComponent,
    UserFeedDetailComponent,
    UserFeedUpdateComponent,
    UserFeedDeletePopupComponent,
    UserFeedDeleteDialogComponent,
    userFeedRoute,
    userFeedPopupRoute
} from './';

const ENTITY_STATES = [...userFeedRoute, ...userFeedPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserFeedComponent,
        UserFeedDetailComponent,
        UserFeedUpdateComponent,
        UserFeedDeleteDialogComponent,
        UserFeedDeletePopupComponent
    ],
    entryComponents: [UserFeedComponent, UserFeedUpdateComponent, UserFeedDeleteDialogComponent, UserFeedDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedServiceUserFeedModule {}
