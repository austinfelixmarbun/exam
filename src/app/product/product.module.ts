import { NgModule } from "@angular/core";
import { ProductRoutingModule } from "./product-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcpagingModule } from "@adins/ucpaging";
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';

@NgModule({
    imports: [
        ProductRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcSubsectionModule,
        UcpagingModule,
    ],
    declarations: [
        ProductHOPagingComponent,
        ProductHOAddComponent
    ]
})
export class ProductModule { }