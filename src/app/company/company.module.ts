import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from 'app/company/company.component';
import { CompanyRoutingComponent } from 'app/company/company-routing.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { BODComponent } from 'app/company/bod/bod.component';
import { BodAddComponent } from 'app/company/bod/add/add-bod.component';
import { CommissionerComponent } from 'app/company/Commissioner/commissioner.component';
import { CommissionerAddComponent } from 'app/company/Commissioner/add/add-commissioner.component';
import { EditCompanyComponent } from 'app/company/edit/edit-company.component';

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
 