import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Epikedin2SharedModule} from 'app/shared';

import {
    accountState,
    ActivateComponent,
    PasswordComponent,
    PasswordResetFinishComponent,
    PasswordResetInitComponent,
    PasswordStrengthBarComponent,
    ProfileComponent,
    RegisterComponent,
    ExperienceComponent
} from './';

@NgModule({
    imports: [Epikedin2SharedModule, RouterModule.forChild(accountState)],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        ProfileComponent,
        ExperienceComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Epikedin2AccountModule {}
