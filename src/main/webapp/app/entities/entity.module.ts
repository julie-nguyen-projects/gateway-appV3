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
