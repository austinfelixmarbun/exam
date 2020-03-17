import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcpagingModule } from "@adins/ucpaging";
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { ProdOfferingAddDetailRoutingModule } from "./prod-offering-add-detail-routing.module";
import { ArchwizardModule } from "angular-archwizard";
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
    declarations: [
    ],
    
    providers: [],

})

export class ProdOfferingAddDetailModule { }