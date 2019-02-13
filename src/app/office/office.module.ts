import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeAddComponent } from './office-add/office-add.component';


@NgModule({
  imports: [
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    OfficeComponent,
    OfficeAddComponent,
  ]
})
export class OfficeModule { }
 