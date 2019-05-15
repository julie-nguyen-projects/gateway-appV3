import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-extra',
                loadChildren: './user-extra/user-extra.module#Epikedin2UserExtraModule'
            },
            {
                path: 'country',
                loadChildren: './country/country.module#Epikedin2CountryModule'
            },
            {
                path: 'city',
                loadChildren: './city/city.module#Epikedin2CityModule'
            },
            {
                path: 'city',
                loadChildren: './city/city.module#Epikedin2CityModule'
            },
            {
                path: 'conversation',
                loadChildren: './conversationService/conversation/conversation.module#ConversationServiceConversationModule'
            },
            {
                path: 'user-conv',
                loadChildren: './conversationService/user-conv/user-conv.module#ConversationServiceUserConvModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Epikedin2EntityModule {}
