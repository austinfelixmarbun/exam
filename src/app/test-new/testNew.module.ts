import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { TestNewRoutingModule } from "./testNew-routing.module";
import { ShowErrorsComponent } from "./show-errors.component";
import { Dummy2Component } from './dummy2/dummy2.component';
import { Dummy3Component } from './dummy3/dummy3.component';
import { UcAddressGroupComponent } from './uc-address-group/uc-address-group.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcLookupGroupComponent } from './uc-lookup-group/uc-lookup-group.component';
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
        UcinputnumberModule
    ],
    declarations: [
        Dummy1Component,
        ShowErrorsComponent,
        Dummy2Component,
        Dummy3Component,
        UcAddressGroupComponent,
        UcLookupGroupComponent,
        DummyComponent,
        UcSubsectionComponent,
        Dummy4Component,
        UcSearchComponent,
        Dummy5Component,
        UcInputNumberComponent
    ],

})
export class TestNewModule { }