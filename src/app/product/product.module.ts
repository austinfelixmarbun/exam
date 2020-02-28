import { NgModule } from '@angular/core';
import { ProductRoutingModule } from 'app/product/product-routing.module';
import { UcpagingModule } from '@adins/ucpaging';
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ProductRoutingModule,
        UcpagingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProdOfferingPagingComponent,
        ProdOfferingAddComponent,
    ]
  })

export class ProductModule { }