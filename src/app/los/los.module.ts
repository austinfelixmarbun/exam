import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewApplicationComponent } from './CreditProcess/new-application/new-application.component';
import { LosRoutingModule } from './los-routing.module';
import { ProspectApplDataComponent } from './CreditProcess/prospect-appl-data/prospect-appl-data.component';

@NgModule({
  imports: [
    LosRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
      NewApplicationComponent,
      ProspectApplDataComponent
  ]
})
export class LosModule { }
 