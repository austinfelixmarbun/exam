import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { Template1Component } from './template/template1/template1.component';
import { AdInsModule } from "app/components/adins-module/adins.module";
import { UcAddressGroupComponent } from "./uc/uc-address-group/uc-address-group.component";
import { UcSearchComponent } from "./uc/uc-search/uc-search.component";
import { UcInputNumberComponent } from "./uc/uc-input-number/uc-input-number.component";
import { UcTempComponent } from "./uc/uc-temp/uc-temp.component";
import { ArchwizardComponent } from "app/forms/archwizard/archwizard.component";
import { ArchwizardModule } from "angular-archwizard";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { UcSubsectionComponent } from "./uc/uc-subsection/uc-subsection.component";
import { Test1Component } from "./test1/test1.component";
import { ShowErrorsComponent } from "./show-errors.component";
import { UcLookupGroupComponent } from "./uc/uc-lookup-group/uc-lookup-group.component";
import { UcViewComponent } from './uc/uc-view/uc-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        TestRoutingModule,
        AdInsModule
    ],
    declarations: [
        Template1Component,
        Test1Component,
        UcAddressGroupComponent,
        UcSubsectionComponent,
        UcSearchComponent,
        UcInputNumberComponent,
        UcTempComponent,
        ShowErrorsComponent,
        UcLookupGroupComponent,
        UcViewComponent
    ],
    providers: [
        ArchwizardComponent,
        ArchwizardModule,
        NGXToastrService
    ]

})
export class TestModule { }