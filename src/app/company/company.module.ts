import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyRoutingComponent } from './company-routing.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { BODComponent } from './bod/bod.component';
import { BodAddComponent } from './bod/add/add-bod.component';
import { CommissionerComponent } from './Commissioner/commissioner.component';
import { CommissionerAddComponent } from './Commissioner/add/add-commissioner.component';
import { EditCompanyComponent } from './edit/edit-company.component';

@NgModule({
  imports: [
    CompanyRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    CompanyComponent,
    BODComponent,
    BodAddComponent,
    CommissionerComponent,
    CommissionerAddComponent,
    EditCompanyComponent
  ]
})
export class CompanyModule { }
 