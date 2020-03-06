import { NgModule } from "@angular/core";
import { GeneralDataComponent } from "./general-data/general-data.component";
import { OfficeMemberComponent } from "./office-member/office-member.component";
import { ProductComponentComponent } from "./product-component/product-component.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "app/app-routing.module";
import { RouterModule, Routes } from "@angular/router";
import { ProductHoAdddetailComponent } from "./product-ho-adddetail.component";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcpagingModule } from "@adins/ucpaging";
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { ProductHOAddDetailRoutingModule } from "./product-ho-adddetail-routing.module";
import { ArchwizardModule } from "angular-archwizard";

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
        ProductHOAddDetailRoutingModule,
        ArchwizardModule
    ],
    declarations: [
        
    ],
    
    providers: [],

})

export class ProductHOAddDetailModule { }