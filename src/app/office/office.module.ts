import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from 'app/office/office.component';
import { OfficeRoutingModule } from 'app/office/office-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { OfficeAddComponent } from 'app/office/office-add/office-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeEmpPosComponent } from 'app/office/office-emp-pos/office-emp-pos.component';
import { OfficeEmpPosAddComponent } from 'app/office/office-emp-pos/office-emp-pos-add/office-emp-pos-add.component';
import { OfficeAreaAddEditComponent } from 'app/office/office-area/office-area-add-edit/office-area-add-edit.component';
import { OfficeAreaPagingComponent } from 'app/office/office-area/office-area-paging/office-area-paging.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { OfficeGroupMemberComponent } from './office-group-member/office-group-member.component';
import { UcpagingComponent, UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { OfficeGroupMemberAddComponent } from './office-group-member-add/office-group-member-add.component';


@NgModule({
  imports: [
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcSubsectionModule,
    SharingComponentModule
  ],
  declarations: [
    OfficeComponent,
    OfficeAddComponent,
    OfficeEmpPosComponent,
    OfficeEmpPosAddComponent,
    OfficeAreaAddEditComponent,
    OfficeAreaPagingComponent,
    OfficeGroupMemberComponent,
    OfficeGroupMemberAddComponent
  ]
})
export class OfficeModule { }
 