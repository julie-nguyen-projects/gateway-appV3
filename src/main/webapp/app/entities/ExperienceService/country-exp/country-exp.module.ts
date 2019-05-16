import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Epikedin2SharedModule } from 'app/shared';
import {
    CountryExpComponent,
    CountryExpDetailComponent,
    CountryExpUpdateComponent,
    CountryExpDeletePopupComponent,
    CountryExpDeleteDialogComponent,
    countryExpRoute,
    countryExpPopupRoute
} from './';

const ENTITY_STATES = [...countryExpRoute, ...countryExpPopupRoute];

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryExpComponent,
        CountryExpDetailComponent,
        CountryExpUpdateComponent,
        CountryExpDeleteDialogComponent,
        CountryExpDeletePopupComponent
    ],
    entryComponents: [CountryExpComponent, CountryExpUpdateComponent, CountryExpDeleteDialogComponent, CountryExpDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceServiceCountryExpModule {}
