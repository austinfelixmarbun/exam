import { NgModule } from "@angular/core";
import { ProductRoutingModule } from "./product-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcpagingModule } from "@adins/ucpaging";
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from './product-HO/product-ho-adddetail/product-ho-adddetail.component';
import { GeneralDataComponent } from './product-HO/product-ho-adddetail/general-data/general-data.component';
import { ProductComponentComponent } from './product-HO/product-ho-adddetail/product-component/product-component.component';
import { OfficeMemberComponent } from './product-HO/product-ho-adddetail/office-member/office-member.component';

@NgModule({
    imports: [
        ProductRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcSubsectionModule,
        UcpagingModule,
    ],
    declarations: [
        ProductHOPagingComponent,
        ProductHOAddComponent,
        ProductHoAdddetailComponent
    ]
})
export class ProductModule { }