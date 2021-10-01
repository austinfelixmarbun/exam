import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewChildRoutingModule } from './pefindo-view-child-routing.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdInsSharedModule,
    PefindoViewChildRoutingModule
  ]
})
export class PefindoViewChildModule { }
