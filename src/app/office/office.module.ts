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


@NgModule({
  imports: [
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    OfficeComponent,
    OfficeAddComponent,
    OfficeEmpPosComponent,
    OfficeEmpPosAddComponent,
    OfficeAreaAddEditComponent,
    OfficeAreaPagingComponent,
  ]
})
export class OfficeModule { }
 