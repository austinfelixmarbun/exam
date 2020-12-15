import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorHoldingPagingComponent } from './vendor-holding-paging/vendor-holding-paging.component';
import { VendorHoldingAddEditComponent } from './vendor-holding-add-edit/vendor-holding-add-edit.component';
import { BankInfoComponent } from './component/bank-info/bank-info.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { VendorGroupPagingComponent } from './vendor-group/vendor-group-paging/vendor-group-paging.component';
import { VendorGroupViewComponent } from './vendor-group/vendor-group-view/vendor-group-view.component';
import { UcviewgenericModule, UcviewgenericComponent } from '@adins/ucviewgeneric';
import { VendorGroupmemberComponent } from './vendor-groupmember/vendor-groupmember.component';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
import { VendorBranchPagingComponent } from './vendor-branch/vendor-branch-paging/vendor-branch-paging.component';
import { ContactPersonListComponent } from './component/contact-person-list/contact-person-list.component';
import { ContactPersonAddEditComponent } from './component/contact-person-add-edit/contact-person-add-edit.component';
import { VendorBranchAddEditComponent } from './vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit.component';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { AddressComponent } from './component/address/address.component';
import { ArchwizardModule } from 'angular-archwizard';
import { VendorHoRegistrationComponent } from './vendor-ho/vendor-ho-registration/vendor-ho-registration.component';
import { VendorService } from './vendor.service';
import { VendorHoInfoComponent } from './vendor-ho/vendor-ho-info/vendor-ho-info.component';
import { MainHoInfoComponent } from './vendor-ho/vendor-ho-info/main-ho-info/main-ho-info.component';
import { MatTabsModule } from '@angular/material';
import { MainInfoViewComponent } from './component/main-info-view/main-info-view.component';
import { VendorBranchEmployeePagingComponent } from './vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging.component';
import { VendorBranchEmployeeAddEditComponent } from './vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit.component';
import { VendorEmployeeComponent } from './component/vendor-employee/vendor-employee.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcaddressModule } from '@adins/ucaddress';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoldingRegistrationComponent } from './vendor-holding-registration/vendor-holding-registration.component';
import { HoInfoComponent } from './vendor-ho/vendor-ho-info/ho-info/ho-info.component';
import { HoAddressInfoComponent } from './vendor-ho/vendor-ho-info/ho-address-info/ho-address-info.component';
import { HoTaxInfoComponent } from './vendor-ho/vendor-ho-info/ho-tax-info/ho-tax-info.component';
import { HoBankInfoComponent } from './vendor-ho/vendor-ho-info/ho-bank-info/ho-bank-info.component';
import { VendorBranchRegistrationComponent } from './vendor-branch/vendor-branch-registration/vendor-branch-registration.component';
import { VendorBranchOfficeMemberAddComponent } from './vendor-branch/vendor-branch-office-member-add/vendor-branch-office-member-add.component';
import { VendorBranchOfficeMemberComponent } from './vendor-branch/vendor-branch-office-member/vendor-branch-office-member.component';
import { VendorBranchViewComponent } from './vendor-branch/vendor-branch-view/vendor-branch-view.component';
import { HoContactPersonInfoComponent } from './vendor-ho/vendor-ho-info/ho-contact-person-info/ho-contact-person-info.component';
import { HoGroupInfoComponent } from './vendor-ho/vendor-ho-info/ho-group-info/ho-group-info.component';
import { HoBranchInfoComponent } from './vendor-ho/vendor-ho-info/ho-branch-info/ho-branch-info.component';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { VendorPagingComponent } from './component/vendor/vendor-paging/vendor-paging.component';
import { VendorATPMAddEditComponent } from './vendor-ATPM/vendor-atpm-add-edit/vendor-atpm-add-edit.component';
import { VendorATPMRegistrationComponent } from './vendor-ATPM/vendor-atpm-registration/vendor-atpm-registration.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { VendorAtpmSelectComponent } from './vendor-ATPM/vendor-atpm-select/vendor-atpm-select.component';


export const customCurrencyMaskConfig = {     
  align: "right",     
  allowNegative: true,     
  allowZero: true,     
  decimal: ".",     
  precision: 2,     
  prefix: "",     
  suffix: "",     
  thousands: ",",     
  nullable: false
};

@NgModule({
  imports: [
    VendorRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcSubsectionModule,
    UclookupgenericModule,
    ReactiveFormsModule,
    TreeViewModule,
    UcviewgenericModule,
    NgbDropdownModule,
    ArchwizardModule,
    MatTabsModule,
    UcShowErrorsModule,
    UcaddressModule,
    UcaddtotempModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    VendorHoldingPagingComponent,
    VendorHoldingAddEditComponent,
   BankInfoComponent,
    VendorGroupComponent,
    VendorGroupPagingComponent,
    VendorGroupViewComponent,
    VendorGroupmemberComponent,
    VendorSchemeAddEditComponent,
    VendorSchemePagingComponent,
    VendorSchemeMemberAddComponent,
    VendorSchemeMemberPagingComponent,
    VendorHoAddEditComponent,
    VendorHoPagingComponent,
    VendorHoldingViewComponent,
    VendorBranchPagingComponent,
    VendorBranchAddEditComponent,
    ContactPersonListComponent,
    ContactPersonAddEditComponent,
    AddressComponent,
    VendorHoRegistrationComponent,
    VendorHoInfoComponent,
    MainHoInfoComponent,
    MainInfoViewComponent,
    VendorBranchEmployeePagingComponent,
    VendorBranchEmployeeAddEditComponent,
    VendorEmployeeComponent,
    VendorHoldingRegistrationComponent,
    HoInfoComponent,
    HoTaxInfoComponent,
    HoAddressInfoComponent,
    HoBankInfoComponent,
    VendorBranchRegistrationComponent,
    VendorBranchOfficeMemberAddComponent,
    VendorBranchOfficeMemberComponent,
    VendorBranchViewComponent,
    HoContactPersonInfoComponent,
    HoGroupInfoComponent,
    HoBranchInfoComponent,
    VendorPagingComponent,
    VendorATPMAddEditComponent,
    VendorATPMRegistrationComponent,
    VendorAtpmSelectComponent
  ],
  entryComponents : [UcviewgenericComponent, VendorAtpmSelectComponent],
  providers: [
    VendorService,
    NGXToastrService
  ]
})
export class VendorModule { }
