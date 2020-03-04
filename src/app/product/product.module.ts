import { NgModule } from '@angular/core';
import { ProductRoutingModule } from 'app/product/product-routing.module';
import { UcpagingModule } from '@adins/ucpaging';
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { ProdOfferingAddDetailComponent } from './prod-offering/prod-offering-add-detail/prod-offering-add-detail.component'

@NgModule({
    imports: [
        ProductRoutingModule,
        UcpagingModule,
        ReactiveFormsModule,
        UclookupgenericModule
    ],
    declarations: [
        ProdOfferingPagingComponent,
        ProdOfferingAddComponent,
        ProdOfferingAddDetailComponent,
    ]
  })

export class ProductModule { }