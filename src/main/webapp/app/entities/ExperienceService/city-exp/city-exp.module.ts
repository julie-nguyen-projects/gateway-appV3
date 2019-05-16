import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    CityExpComponent,
    CityExpDetailComponent,
    CityExpUpdateComponent,
    CityExpDeletePopupComponent,
    CityExpDeleteDialogComponent,
    cityExpRoute,
    cityExpPopupRoute
} from './';

const ENTITY_STATES = [...cityExpRoute, ...cityExpPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CityExpComponent,
        CityExpDetailComponent,
        CityExpUpdateComponent,
        CityExpDeleteDialogComponent,
        CityExpDeletePopupComponent
    ],
    entryComponents: [CityExpComponent, CityExpUpdateComponent, CityExpDeleteDialogComponent, CityExpDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceServiceCityExpModule {}
