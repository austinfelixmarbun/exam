import { NgModule } from "@angular/core";
import { ProductRoutingModule } from "./product-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcpagingModule } from "@adins/ucpaging";
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from './product-HO/product-ho-adddetail/product-ho-adddetail.component';
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { ProductHODeactivatePagingComponent } from "./product-ho/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-ho/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { SharingComponentModule } from "../shared/sharingcomponent.module";
import { HttpModule } from "@angular/http";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { ArchwizardModule } from "angular-archwizard";
import { GeneralDataComponent } from "./product-HO/product-ho-adddetail/general-data/general-data.component";
import { OfficeMemberComponent } from "./product-HO/product-ho-adddetail/office-member/office-member.component";
import { ProductComponentComponent } from "./product-HO/product-ho-adddetail/product-component/product-component.component";
import { ProductHOViewComponent } from "./product-HO/product-ho-view/product-ho-view.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ProductOfferingViewComponent } from "./prod-offering/prod-offering-view/product-offering-view.component";
import { ProductHOApprovalComponent } from "./product-HO/product-ho-approval/product-ho-approval.component";
import { ProductHOApprovalDetailComponent } from "./product-HO/product-ho-approval-detail/product-ho-approval-detail.component";
import { ProductOfferingApprovalComponent } from "./prod-offering/prod-offering-approval/product-offering-approval.component";
import { ProductOfferingApprovalDetailComponent } from "./prod-offering/prod-offering-approval-detail/product-offering-approval-detail.component";
import { ProductHODeactivateApprovalComponent } from "./product-HO/product-ho-deact-apv/product-ho-deact-apv.component";
import { ProductHODeactivateApprovalDetailComponent } from "./product-HO/product-ho-deact-apv-detail/product-ho-deact-apv-detail.component";
import { ProductOfferingDeactivatePagingComponent } from "./prod-offering/prod-offering-deactivate-paging/product-offering-deactivate.component";
import { ProductOfferingDeactivateApprovalComponent } from "./prod-offering/prod-offering-deact-apv/product-offering-deact-apv.component";
import { ProductOfferingDeactivateApprovalDetailComponent } from "./prod-offering/prod-offering-deact-apv-detail/product-offering-deact-apv-detail.component";

@NgModule({
  imports: [
    ProductRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UCSearchModule,
    UcgridfooterModule,
    UcSubsectionModule,
    UcpagingModule,
    HttpModule,
    SharingComponentModule,
    UcviewgenericModule,
    ArchwizardModule,
    MatTabsModule,
    MatDividerModule
  ],
  declarations: [
    ProductHOPagingComponent,
    ProductHOAddComponent,
    ProductHoAdddetailComponent,
    ProdOfferingPagingComponent,
    ProdOfferingAddComponent,
    ProductHODeactivatePagingComponent,
    ProductHODeactivateEditComponent,
    GeneralDataComponent,
    ProductComponentComponent,
    OfficeMemberComponent,
    ProductHOViewComponent,
    ProductOfferingViewComponent,
    ProductHOApprovalComponent,
    ProductHOApprovalDetailComponent,
    ProductOfferingApprovalComponent,
    ProductOfferingApprovalDetailComponent,
    ProductHODeactivateApprovalComponent,
    ProductHODeactivateApprovalDetailComponent,
    ProductOfferingDeactivatePagingComponent,
    ProductOfferingDeactivateApprovalComponent,
    ProductOfferingDeactivateApprovalDetailComponent
  ]

})
export class ProductModule { }
