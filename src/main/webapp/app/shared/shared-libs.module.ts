import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CookieModule} from 'ngx-cookie';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AutoCompleteModule, KeyFilterModule, TabViewModule} from 'primeng/primeng';

@NgModule({
    imports: [NgbModule.forRoot(), InfiniteScrollModule, CookieModule.forRoot(), FontAwesomeModule,
        AutoCompleteModule, TabViewModule, KeyFilterModule],
    exports: [FormsModule, CommonModule, NgbModule, NgJhipsterModule, InfiniteScrollModule, FontAwesomeModule,
        AutoCompleteModule, TabViewModule, KeyFilterModule]
})
export class Epikedin2SharedLibsModule {
    static forRoot() {
        return {
            ngModule: Epikedin2SharedLibsModule
        };
    }
}
