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
import { VendorComponent } from './vendor.component';
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
import { MatTabsModule } from '@angular/material';


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
    MatTabsModule
  ],
  declarations: [
    VendorComponent,
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
    VendorHoRegistrationComponent
  ],
  entryComponents : [UcviewgenericComponent],
  providers: [
    VendorService
  ]
})
export class VendorModule { }
