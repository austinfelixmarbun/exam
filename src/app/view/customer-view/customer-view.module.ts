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
import { CustomerViewComponent } from "./customer-view.component";
import { CustomerViewXComponent } from "app/impl/view/customer-view/customer-view-x.component";
import { CustomerViewHeaderPersonalComponent } from "./customer-view-header-personal/customer-view-header-personal.component";
import { CustomerViewHeaderPersonalXComponent } from "app/impl/view/customer-view/customer-view-header-personal/customer-view-header-personal-x.component";
import { CustomerViewHeaderCompanyComponent } from "./customer-view-header-company/customer-view-header-company.component";
import { CustomerViewRoutingModule } from "./customer-view-routing.module";
import { CustomerViewIframeGenericComponent } from "./customer-view-iframe-generic/customer-view-iframe-generic.component";
import { SharedModule } from "app/shared/shared.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { CustomerViewHeaderCompanyXComponent } from "app/impl/view/customer-view/customer-view-header-company-x/customer-view-header-company-x.component";


@NgModule({
  imports: [
    CustomerViewRoutingModule,
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
    UcShowErrorsModule,
    SharedModule,
    AdInsSharedModule
    
  ],
  declarations: [
   CustomerViewComponent,
   CustomerViewXComponent,
   CustomerViewHeaderPersonalComponent,
   CustomerViewHeaderPersonalXComponent,
   CustomerViewHeaderCompanyComponent,
   CustomerViewHeaderCompanyXComponent,
   CustomerViewIframeGenericComponent
  ],
  entryComponents: [
    UclookupgenericComponent,
    UcviewgenericComponent,
    UcgridviewComponent
  ]

})
export class CustomerViewModule { }