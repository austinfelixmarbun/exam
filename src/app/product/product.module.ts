import { NgModule } from '@angular/core';
import { ProductRoutingModule } from 'app/product/product-routing.module';
import { UcpagingModule } from '@adins/ucpaging';
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { ProdOfferingAddDetailComponent } from './prod-offering/prod-offering-add-detail/prod-offering-add-detail.component'
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from './product-HO/product-ho-adddetail/product-ho-adddetail.component';
import { GeneralDataComponent } from './product-HO/product-ho-adddetail/general-data/general-data.component';
import { ProductComponentComponent } from './product-HO/product-ho-adddetail/product-component/product-component.component';
import { OfficeMemberComponent } from './product-HO/product-ho-adddetail/office-member/office-member.component';

@NgModule({
    imports: [
        ProductRoutingModule,
        UcpagingModule,
        ReactiveFormsModule,
        UclookupgenericModule,
        FormsModule,
    ],
    declarations: [
        ProdOfferingPagingComponent,
        ProdOfferingAddComponent,
        ProdOfferingAddDetailComponent,
        ProductHOPagingComponent,
        ProductHOAddComponent,
        ProductHoAdddetailComponent
    ]
  })

export class ProductModule { }