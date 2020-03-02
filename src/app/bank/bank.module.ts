import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from 'app/bank/bank.component';
import { BankRoutingComponent } from 'app/bank/bank-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  imports: [
    BankRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    SharingComponentModule,
    UcpagingModule,
    NgbModule,
    UcSubsectionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BankComponent,
    BankAddComponent
  ]
})
export class BankModule { }
