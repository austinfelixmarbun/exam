import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharingModule } from "app/shared/sharing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { DummyComponent } from "./dummy/dummy.component";
import { DummyAddComponent } from "./dummy/dummy-add/dummy-add.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";
import { DummyPagingComponent } from "./dummy/dummy-paging/dummy-paging.component";
import { Template1Component } from './template/template1/template1.component';
import { TestPagingComponent } from './test-paging/test-paging.component';
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { MatTabsModule, MatStepperModule, MatIconModule, MatExpansionModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { TestPagingV2Component } from './test-paging-v2/test-paging-v2.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        SharingComponentModule,
        AngularFileUploaderModule,
        UCSearchModule,
        UcgridfooterModule,
        MatTabsModule,
        MatStepperModule,
        MatIconModule,
        MatExpansionModule,
        TestRoutingModule
    ],
    declarations: [
        DummyComponent,
        DummyAddComponent,
        Dummy2Component,
        Dummy3Component,
        DummyPagingComponent,
        Template1Component,
        TestPagingComponent,
        TestPagingV2Component
    ],

})
export class TestModule { }