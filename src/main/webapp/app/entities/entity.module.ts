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
                path: 'conversation',
                loadChildren: './conversationService/conversation/conversation.module#ConversationServiceConversationModule'
            },
            {
                path: 'user-conv',
                loadChildren: './conversationService/user-conv/user-conv.module#ConversationServiceUserConvModule'
            },
            {
                path: 'message',
                loadChildren: './conversationService/message/message.module#ConversationServiceMessageModule'
            },
            {
                path: 'user-feed',
                loadChildren: './feedService/user-feed/user-feed.module#FeedServiceUserFeedModule'
            },
            {
                path: 'post',
                loadChildren: './feedService/post/post.module#FeedServicePostModule'
            },
            {
                path: 'comment',
                loadChildren: './feedService/comment/comment.module#FeedServiceCommentModule'
            },
            {
                path: 'company',
                loadChildren: './ExperienceService/company/company.module#ExperienceServiceCompanyModule'
            },
            {
                path: 'country-exp',
                loadChildren: './ExperienceService/country-exp/country-exp.module#ExperienceServiceCountryExpModule'
            },
            {
                path: 'city-exp',
                loadChildren: './ExperienceService/city-exp/city-exp.module#ExperienceServiceCityExpModule'
            },
            {
                path: 'school',
                loadChildren: './ExperienceService/school/school.module#ExperienceServiceSchoolModule'
            },
            {
                path: 'exp-user',
                loadChildren: './ExperienceService/exp-user/exp-user.module#ExperienceServiceExpUserModule'
            },
            {
                path: 'experience',
                loadChildren: './ExperienceService/experience/experience.module#ExperienceServiceExperienceModule'
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
