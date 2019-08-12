import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipcodeRoutingComponent } from 'app/zipcode/zipcode-routing.module';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { LookupemployeeComponent } from '@adins/lookupemployee';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { LookupdistrictModule } from '@adins/lookupdistrict';
import { lookupbizunitmodule } from '@adins/lookupbizunit';


@NgModule({
  imports: [
    ZipcodeRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    lookupbizunitmodule,
    UCSearchModule,
    UcgridfooterModule,
    LookupdistrictModule,
    ReactiveFormsModule
  ],
  declarations: [
    ZipcodeComponent,
    ZipcodeAddComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupemployeeComponent),
      multi: true
    }
  ]
})
export class ZipcodeModule { }
