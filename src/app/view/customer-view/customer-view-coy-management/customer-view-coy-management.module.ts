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
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewCoyManagementRoutingModule } from "./customer-view-coy-management-routing.module";
import { CustomerViewCoyManagementComponent } from "./customer-view-coy-management.component";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { CustomerViewCoyManagementXComponent } from "app/impl/view/customer-view/customer-view-coy-management/customer-view-coy-management-x.component";



@NgModule({
  imports: [
    CustomerViewCoyManagementRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcviewgenericModule,
    UcgridviewModule,
    NgbModule,
    SharingModule,
    AdInsSharedModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcShowErrorsModule,
  ],
  declarations: [
    CustomerViewCoyManagementComponent,
    CustomerViewCoyManagementXComponent

  ],
  entryComponents: [
    UcviewgenericComponent,
    UcgridviewComponent
  ]

})
export class CustomerViewCoyManagementModule { }