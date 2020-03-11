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
import { GeneralDataComponent } from './prod-offering/prod-offering-add-detail/general-data/general-data.component';
import { ProductComponentComponent } from './prod-offering/prod-offering-add-detail/product-component/product-component.component';
import { OfficeMemberComponent } from './prod-offering/prod-offering-add-detail/office-member/office-member.component';
import { GeneralDataHOComponent } from './product-HO/product-ho-adddetail/general-data/general-data.component';
import { OfficeMemberHOComponent } from './product-HO/product-ho-adddetail/office-member/office-member.component';
import { ProductComponentHOComponent } from './product-HO/product-ho-adddetail/product-component/product-component.component';
import { ProductHODeactivatePagingComponent } from "./product-ho/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-ho/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { SharingComponentModule } from "../shared/sharingcomponent.module";
import { HttpModule } from "@angular/http";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from "angular-archwizard";
import { ProductHOViewComponent } from "./product-HO/product-ho-view/product-ho-view.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ProductOfferingViewComponent } from "./prod-offering/prod-offering-view/product-offering-view.component";
import { ListOfficeMemberComponentOffering } from './prod-offering/prod-offering-add-detail/office-member/list-office-member/list-office-member.component';
import { SearchOfficeComponentOffering } from './prod-offering/prod-offering-add-detail/office-member/search-office/search-office.component';
import { ListOfficeMemberComponent } from './product-HO/product-ho-adddetail/office-member/list-office-member/list-office-member.component';
import { SearchOfficeComponent } from './product-HO/product-ho-adddetail/office-member/search-office/search-office.component';

@NgModule({
    imports: [
        ProductRoutingModule,
        UcpagingModule,
        ReactiveFormsModule,
        UclookupgenericModule,
        FormsModule,
        HttpModule,
        SharingComponentModule,
        UcviewgenericModule,
        UCSearchModule,
        UcgridfooterModule,
        UcSubsectionModule,
        CommonModule,
        ArchwizardModule,
        MatTabsModule,
        MatDividerModule
    ],
    declarations: [
        ProdOfferingPagingComponent,
        ProdOfferingAddComponent,
        ProdOfferingAddDetailComponent,
        ProductHOPagingComponent,
        ProductHOAddComponent,
        ProductHoAdddetailComponent,
        ProductHODeactivatePagingComponent,
        ProductHODeactivateEditComponent,
        GeneralDataComponent,
        ProductComponentComponent,
        OfficeMemberComponent,
        ProductHOViewComponent,
        ProductOfferingViewComponent,
        ListOfficeMemberComponent,
        SearchOfficeComponent,
        GeneralDataHOComponent,
        ProductComponentHOComponent,
        OfficeMemberHOComponent,
        ListOfficeMemberComponentOffering,
        SearchOfficeComponentOffering
    ]
  })

export class ProductModule { }
