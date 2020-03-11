import { NgModule } from "@angular/core";
import { GeneralDataComponent } from "./general-data/general-data.component";
import { ProductComponentComponent } from "./product-component/product-component.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "app/app-routing.module";
import { RouterModule, Routes } from "@angular/router";
import { ProdOfferingAddDetailComponent } from "./prod-offering-add-detail.component";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcpagingModule } from "@adins/ucpaging";
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { ProdOfferingAddDetailRoutingModule } from "./prod-offering-add-detail-routing.module";
import { OfficeMemberComponent } from './office-member/office-member.component';
import { ArchwizardModule } from "angular-archwizard";
import { ListOfficeMemberComponentOffering } from './office-member/list-office-member/list-office-member.component';
import { SearchOfficeComponentOffering } from './office-member/search-office/search-office.component';
import { UCSearchModule } from "@adins/ucsearch";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        UclookupgenericModule,
        UcpagingModule,
        UcSubsectionModule,
        SharingComponentModule,
        ProdOfferingAddDetailRoutingModule,
        ArchwizardModule,
        UCSearchModule
    ],
    declarations: [],
    
    providers: [],

})

export class ProdOfferingAddDetailModule { }