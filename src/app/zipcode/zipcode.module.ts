import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LookupEmployeeComponent } from 'app/shared/lookup/lookup-employee/lookup-employee.component';
import { ZipcodeRoutingComponent } from 'app/zipcode/zipcode-routing.module';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';


@NgModule({
  imports: [
    ZipcodeRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ZipcodeComponent,
    ZipcodeAddComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupEmployeeComponent),
      multi: true
    }
  ]
})
export class ZipcodeModule { }
