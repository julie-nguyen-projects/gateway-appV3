import { NgModule } from '@angular/core';

import { Epikedin2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Epikedin2SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Epikedin2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Epikedin2SharedCommonModule {}
