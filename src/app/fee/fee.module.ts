import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { FeePagingComponent } from './fee-paging/fee-paging.component';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { FeeAddEditComponent } from './fee-add-edit/fee-add-edit.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [FeePagingComponent, FeeAddEditComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    AdInsModule,
    NgMultiSelectDropDownModule
  ],
  providers: [
    NGXToastrService
  ]
})
export class FeeModule { }
