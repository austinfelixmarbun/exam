import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
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
import { BranchComponent } from './branch/branch.component';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { UclookupgenericModule } from '@adins/uclookupgeneric';


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
    ReactiveFormsModule,
    TreeViewModule,
    UcviewgenericModule,
    UclookupgenericModule,
    NgbDropdownModule
  ],
  declarations: [
    VendorComponent,
    BranchComponent,
    VendorSchemeAddEditComponent,
    VendorSchemePagingComponent,
    VendorSchemeMemberAddComponent,
    VendorSchemeMemberPagingComponent,
    VendorHoAddEditComponent,
    VendorHoPagingComponent
  ]
})
export class VendorModule { }
