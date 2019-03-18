import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipcodeAddComponent } from './add/add-zipcode.component';
import { ZipcodeComponent } from './zipcode.component';
import { ZipcodeRoutingComponent } from './zipcode-routing.module';

@NgModule({
  imports: [
    ZipcodeRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    ZipcodeComponent,
    ZipcodeAddComponent
  ]
})
export class ZipcodeModule { }
 