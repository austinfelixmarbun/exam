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
import { HoAtpmInfoComponent } from "./vendor-ho-info/ho-atpm-info/ho-atpm-info.component";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { VendorCollCompanyViewComponent } from "app/vendor/vendor-coll-company/vendor-coll-company-view/vendor-coll-company-view.component";


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
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcShowErrorsModule,
    
  ],
  declarations: [
     VendorBranchViewComponent,
     VendorHoldingViewComponent,
     VendorHoInfoComponent,
     VendorCollCompanyViewComponent,
     HoAddressInfoComponent,
     HoBankInfoComponent,
     HoBranchInfoComponent,
     HoContactPersonInfoComponent,
     HoGroupInfoComponent,
     HoInfoComponent,
     HoTaxInfoComponent,
     MainHoInfoComponent,
     MainInfoViewComponent,
     HoAtpmInfoComponent,
  ],
  entryComponents: [
    UclookupgenericComponent,
    UcviewgenericComponent,
    UcgridviewComponent,
  ]

})
export class VendorViewModule { }