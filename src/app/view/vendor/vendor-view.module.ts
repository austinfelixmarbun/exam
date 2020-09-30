import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UclookupgenericComponent, UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcapprovalhistModule, UcapprovalhistComponent } from "@adins/ucapprovalhist";

import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { VendorViewRoutingModule } from "./vendor-view-routing.module";
import { VendorBranchViewComponent } from "./vendor-branch-view/vendor-branch-view.component";
import { VendorHoldingViewComponent } from "./vendor-holding-view/vendor-holding-view.component";
import { VendorHoInfoComponent } from "./vendor-ho-info/vendor-ho-info.component";
import { HoAddressInfoComponent } from "./vendor-ho-info/ho-address-info/ho-address-info.component";
import { HoBankInfoComponent } from "./vendor-ho-info/ho-bank-info/ho-bank-info.component";
import { HoBranchInfoComponent } from "./vendor-ho-info/ho-branch-info/ho-branch-info.component";
import { HoContactPersonInfoComponent } from "./vendor-ho-info/ho-contact-person-info/ho-contact-person-info.component";
import { HoGroupInfoComponent } from "./vendor-ho-info/ho-group-info/ho-group-info.component";
import { HoInfoComponent } from "./vendor-ho-info/ho-info/ho-info.component";
import { HoTaxInfoComponent } from "./vendor-ho-info/ho-tax-info/ho-tax-info.component";
import { MainHoInfoComponent } from "./vendor-ho-info/main-ho-info/main-ho-info.component";
import { MainInfoViewComponent } from "./vendor-ho-info/main-info-view/main-info-view.component";


@NgModule({
  imports: [
    VendorViewRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UclookupgenericModule,
    UcviewgenericModule,
    UcgridviewModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcapprovalhistModule,
    UcShowErrorsModule,
    
  ],
  declarations: [
     ///vendor branch view
     VendorBranchViewComponent,
     ///vendor holding view
     VendorHoldingViewComponent,
     ///vendor ho
     VendorHoInfoComponent,
     HoAddressInfoComponent,
     HoBankInfoComponent,
     HoBranchInfoComponent,
     HoContactPersonInfoComponent,
     HoGroupInfoComponent,
     HoInfoComponent,
     HoTaxInfoComponent,
     MainHoInfoComponent,
     MainInfoViewComponent,
  ],
  entryComponents: [
    UclookupgenericComponent,
    UcviewgenericComponent,
    UcgridviewComponent,
    UcapprovalhistComponent
  ]

})
export class VendorViewModule { }