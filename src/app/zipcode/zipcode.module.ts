import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipcodeRoutingComponent } from 'app/zipcode/zipcode-routing.module';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { UcShowErrorsModule } from '@adins/uc-show-errors';


@NgModule({
  imports: [
    ZipcodeRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    ReactiveFormsModule,
    UclookupgenericModule,
    UcpagingModule,
    UcShowErrorsModule

  ],
  declarations: [
    ZipcodeComponent,
    ZipcodeAddComponent
  ]
})
export class ZipcodeModule { }
