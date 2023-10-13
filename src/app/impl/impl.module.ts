import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImplRoutingModule } from './impl-routing.module';
import { AdInsModule } from 'app/components/adins-module/adins.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ImplRoutingModule,
    AdInsModule
  ]
})
export class ImplModule { }
