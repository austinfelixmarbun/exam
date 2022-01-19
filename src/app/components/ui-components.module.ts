import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIComponentsRoutingModule } from "./ui-components-routing.module";
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill'
import { DragulaModule } from 'ng2-dragula';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { TagInputModule } from 'ngx-chips';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrComponent } from "./extra/toastr/toastr.component";
import { TypeaheadComponent } from './bootstrap/typeahead/typeahead.component';
import { AdInsSharedModule } from './adins-module/adins-shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdInsSharedModule,
        UIComponentsRoutingModule,
        NouisliderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        QuillModule,
        DragulaModule,
        MatchHeightModule,
        TagInputModule,
        UiSwitchModule,
        NgSelectModule
    ],
    declarations: [
        ToastrComponent,
        TypeaheadComponent
    ],
    entryComponents: []
})
export class UIComponentsModule { }
