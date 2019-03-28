import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { OfficeAddComponent } from './office-add/office-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeEmpPosComponent } from './office-emp-pos/office-emp-pos.component';
import { OfficeEmpPosAddComponent } from './office-emp-pos/office-emp-pos-add/office-emp-pos-add.component';
import { OfficeAreaAddEditComponent } from './office-area/office-area-add-edit/office-area-add-edit.component';
import { OfficeAreaPagingComponent } from './office-area/office-area-paging/office-area-paging.component';


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
 