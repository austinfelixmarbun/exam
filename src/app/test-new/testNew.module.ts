import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { TestNewRoutingModule } from "./testNew-routing.module";
import { Dummy2Component } from './dummy2/dummy2.component';
import { Dummy3Component } from './dummy3/dummy3.component';
import { UcAddressGroupComponent } from './uc-address-group/uc-address-group.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcpagingModule } from "@adins/ucpaging";
import { UcSubsectionModule } from "@adins/uc-subsection";
// import { UcaddressModule } from "@adins/ucaddress";
import { DummyComponent } from './dummy/dummy.component';
import { ArchwizardModule } from "angular-archwizard";
import { UcSubsectionComponent } from './uc-subsection/uc-subsection.component';
import { Dummy4Component } from './dummy4/dummy4.component';
import { UcSearchComponent } from './uc-search/uc-search.component';
import { Dummy5Component } from './dummy5/dummy5.component';
import { UcInputNumberComponent } from './uc-input-number/uc-input-number.component';
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { UcinputnumberModule } from "@adins/ucinputnumber";
import { Dummy6Component } from './dummy6/dummy6.component';
import { Step1Component } from './dummy6/step1/step1.component';
import { Step2Component } from './dummy6/step2/step2.component';
import { Step3Component } from './dummy6/step3/step3.component';
import { Step4Component } from './dummy6/step4/step4.component';
import { Step5Component } from './dummy6/step5/step5.component';
import { NgxStepperModule } from 'ngx-stepper';
import { ArchwizardComponent } from "app/forms/archwizard/archwizard.component";
import { Step7Component } from './dummy6/step7/step7.component';
import { Step8Component } from './dummy6/step8/step8.component';
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { Dummy7Component } from './dummy7/dummy7.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        NgbModule,
        TestNewRoutingModule,
        UclookupgenericModule,
        UcpagingModule,
        UcSubsectionModule,
        // UcaddressModule,
        ArchwizardModule,
        UcShowErrorsModule,
        UcinputnumberModule,
        NgxStepperModule,
        SharingComponentModule
    ],
    declarations: [
        Dummy1Component,
        Dummy2Component,
        Dummy3Component,
        UcAddressGroupComponent,
        DummyComponent,
        UcSubsectionComponent,
        Dummy4Component,
        UcSearchComponent,
        Dummy5Component,
        UcInputNumberComponent,
        Dummy6Component,
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
        Step5Component,
        Step7Component,
        Step8Component,
        Dummy7Component
    ],
    providers: [
        ArchwizardComponent,
        ArchwizardModule
    ]
})
export class TestNewModule { }