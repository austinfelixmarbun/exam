import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from 'app/company/company.component';
import { CompanyRoutingComponent } from 'app/company/company-routing.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BODComponent } from 'app/company/bod/bod.component';
import { BodAddComponent } from 'app/company/bod/add/add-bod.component';
import { CommissionerComponent } from 'app/company/Commissioner/commissioner.component';
import { CommissionerAddComponent } from 'app/company/Commissioner/add/add-commissioner.component';
import { EditCompanyComponent } from 'app/company/edit/edit-company.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';

@NgModule({
  imports: [
    CompanyRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule
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
 