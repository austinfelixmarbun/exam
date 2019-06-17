import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from 'app/bank/bank.component';
import { BankRoutingComponent } from 'app/bank/bank-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { DummyComponent } from './dummy/dummy.component';
import { DummyAddComponent } from './dummy/dummy-add/dummy-add.component';

@NgModule({
  imports: [
    BankRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    BankComponent,
    BankAddComponent,
    DummyComponent,
    DummyAddComponent
  ]
})
export class BankModule { }
