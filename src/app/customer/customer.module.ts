import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    CustomerComponent
  ]
})
export class CustomerModule { }
 