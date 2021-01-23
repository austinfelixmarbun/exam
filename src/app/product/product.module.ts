import { NgModule } from '@angular/core';
import { ProductRoutingModule } from 'app/product/product-routing.module';
import { UcpagingModule } from '@adins/ucpaging';
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { ProdOfferingAddDetailComponent } from './prod-offering/prod-offering-add-detail/prod-offering-add-detail.component'
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from './product-HO/product-ho-adddetail/product-ho-adddetail.component';
import { GeneralDataHOComponent } from './product-HO/product-ho-adddetail/general-data/general-data.component';
import { OfficeMemberHOComponent } from './product-HO/product-ho-adddetail/office-member/office-member.component';
import { ProductComponentHOComponent } from './product-HO/product-ho-adddetail/product-component/product-component.component';
import { GeneralDataComponent } from './prod-offering/prod-offering-add-detail/general-data/general-data.component';
import { ProductComponentComponent } from './prod-offering/prod-offering-add-detail/product-component/product-component.component';
import { ProductHODeactivatePagingComponent } from "./product-HO/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-HO/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { SharingComponentModule } from "../shared/sharingcomponent.module";
import { HttpModule } from "@angular/http";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from "angular-archwizard";
import { ProductHOViewComponent } from "./product-HO/product-ho-view/product-ho-view.component";
import { ProductHOApprovalComponent } from "./product-HO/product-ho-approval/product-ho-approval.component";
import { ProductHOApprovalDetailComponent } from "./product-HO/product-ho-approval-detail/product-ho-approval-detail.component";
import { ProductOfferingApprovalComponent } from "./prod-offering/prod-offering-approval/product-offering-approval.component";
import { ProductOfferingApprovalDetailComponent } from "./prod-offering/prod-offering-approval-detail/product-offering-approval-detail.component";
import { ProductHODeactivateApprovalComponent } from "./product-HO/product-ho-deact-apv/product-ho-deact-apv.component";
import { ProductHODeactivateApprovalDetailComponent } from "./product-HO/product-ho-deact-apv-detail/product-ho-deact-apv-detail.component";
import { ProductOfferingDeactivateApprovalComponent } from "./prod-offering/prod-offering-deact-apv/product-offering-deact-apv.component";
import { ProductOfferingDeactivateApprovalDetailComponent } from "./prod-offering/prod-offering-deact-apv-detail/product-offering-deact-apv-detail.component";
import { MatTabsModule, MatDividerModule } from '@angular/material';
import { ProductOfferingViewComponent } from "./prod-offering/prod-offering-view/product-offering-view.component";
import { ListOfficeMemberComponent } from './product-HO/product-ho-adddetail/office-member/list-office-member/list-office-member.component';
import { SearchOfficeComponent } from './product-HO/product-ho-adddetail/office-member/search-office/search-office.component';
import { OfficeMemberComponent } from './prod-offering/prod-offering-add-detail/office-member/office-member.component';
import { ProductOfferingDeactivatePagingComponent } from "./prod-offering/prod-offering-deactivate-paging/product-offering-deactivate.component";
import { ProductOfferingDeactivateEditComponent } from "./prod-offering/prod-offering-deactivate-edit/product-offering-deactivate-edit.component";
import { ListOfficeMemberComponentOffering } from './prod-offering/prod-offering-add-detail/office-member/list-office-member/list-office-member.component';
import { SearchOfficeComponentOffering } from './prod-offering/prod-offering-add-detail/office-member/search-office/search-office.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcapprovalModule } from '@adins/ucapproval';
import { ProductReturnHoPagingComponent } from './product-HO/product-return-ho-paging/product-return-ho-paging.component';
import { ProdOfferingReturnPagingComponent } from './prod-offering/prod-offering-return-paging/prod-offering-return-paging.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcapprovebyModule } from '@adins/ucapproveby';
import { ProductHoReviewComponent } from './product-HO/product-ho-review/product-ho-review.component';
import { ProdOfferingReviewComponent } from './prod-offering/prod-offering-review/prod-offering-review.component';
import { ProdOfferingReviewPagingComponent } from './prod-offering/prod-offering-review-paging/prod-offering-review-paging.component';
import { ProductHoReviewPagingComponent } from './product-HO/product-ho-review-paging/product-ho-review-paging.component';
  import { UcapprovalcreateModule } from '@adins/Ucapprovalcreate';
  import { UcapprovalR3Module } from '@adins/ucapproval-r3';
  import { UcapprovalHistoryModule } from "@adins/ucapproval-history";
  import { UcapprovalgeneralinfoModule } from "@adins/ucapprovalgeneralinfo";
   
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
    MatDividerModule,
    UclookupgenericModule,
    UcShowErrorsModule,
    UcapprovalModule,
    NgMultiSelectDropDownModule,
    UcaddtotempModule,
    UcapprovebyModule,
    UcapprovalcreateModule,
    UcapprovalR3Module,
    UcapprovalHistoryModule,
    UcapprovalgeneralinfoModule 
  ],
  declarations: [
    ProductHOApprovalComponent,
    ProductHOApprovalDetailComponent,
    ProductOfferingApprovalComponent,
    ProductOfferingApprovalDetailComponent,
    ProductHODeactivateApprovalComponent,
    ProductHODeactivateApprovalDetailComponent,
    ProductOfferingDeactivatePagingComponent,
    ProductOfferingDeactivateApprovalComponent,
    ProductOfferingDeactivateApprovalDetailComponent,
    ProdOfferingPagingComponent,
    ProdOfferingAddComponent,
    ProductHOPagingComponent,
    ProductHOAddComponent,
    ProductHoAdddetailComponent,
    ProductHODeactivatePagingComponent,
    ProductHODeactivateEditComponent,
    GeneralDataComponent,
    ProductComponentComponent,
    OfficeMemberComponent,
    ProductHOViewComponent,
    ProductOfferingViewComponent,
    ProdOfferingAddDetailComponent,
    ListOfficeMemberComponent,
    SearchOfficeComponent,
    GeneralDataHOComponent,
    ProductComponentHOComponent,
    OfficeMemberHOComponent,
    ListOfficeMemberComponentOffering,
    SearchOfficeComponentOffering,
    ProductOfferingDeactivateEditComponent,
    ProductReturnHoPagingComponent,
    ProdOfferingReturnPagingComponent,
    ProductHoReviewPagingComponent,
    ProductHoReviewComponent,
    ProdOfferingReviewComponent,
    ProdOfferingReviewPagingComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class ProductModule { }
