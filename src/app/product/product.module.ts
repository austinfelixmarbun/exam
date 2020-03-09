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
import { ProdOfferingPagingComponent } from 'app/product/prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddComponent } from 'app/product/prod-offering/prod-offering-add/prod-offering-add.component';
import { ProductHODeactivatePagingComponent } from "./product-ho/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-ho/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { SharingComponentModule } from "../shared/sharingcomponent.module";
import { HttpModule } from "@angular/http";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { ArchwizardModule } from "angular-archwizard";
import { GeneralDataComponent } from "./product-HO/product-ho-adddetail/general-data/general-data.component";
import { OfficeMemberComponent } from "./product-HO/product-ho-adddetail/office-member/office-member.component";
import { ProductComponentComponent } from "./product-HO/product-ho-adddetail/product-component/product-component.component";
import { UclookupgenericModule } from "@adins/uclookupgeneric";

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
        HttpModule,
        SharingComponentModule,
        UcviewgenericModule,
        ArchwizardModule,
        UclookupgenericModule
    ],
    declarations: [
        ProductHOPagingComponent,
        ProductHOAddComponent,
        ProductHoAdddetailComponent,
        ProdOfferingPagingComponent,
        ProdOfferingAddComponent,
        ProductHODeactivatePagingComponent,
        ProductHODeactivateEditComponent,
        GeneralDataComponent,
        ProductComponentComponent,
        OfficeMemberComponent
    ]
})
export class ProductModule { }
