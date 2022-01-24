import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { ArchwizardComponent } from "app/forms/archwizard/archwizard.component";
import { ArchwizardModule } from "angular-archwizard";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        AdInsSharedModule,
        TestRoutingModule,
        AdInsModule
    ],
    declarations: [
    ],
    providers: [
        ArchwizardComponent,
        ArchwizardModule,
        NGXToastrService
    ]

})
export class TestModule { }