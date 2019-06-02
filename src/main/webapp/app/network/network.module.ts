import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { HomeNetworkComponent } from './home-network/home-network.component';
import {Epikedin2SharedModule} from 'app/shared';
import {networkState} from 'app/network/network.route';

@NgModule({
    imports: [
        CommonModule,
        Epikedin2SharedModule,
        RouterModule.forChild(networkState)
    ],
    declarations: [HomeNetworkComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NetworkModule { }
