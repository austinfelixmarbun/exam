import { NgModule } from "@angular/core";
import { RefFormRoutingModule } from "./ref-form-routing.module";
import { UcpagingModule } from "@adins/ucpaging";
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { ReactiveFormsModule } from "@angular/forms";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { HttpModule } from "@angular/http";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { RefFormPagingComponent } from "./ref-form-paging/ref-form-paging.component";
import { RefFormDetailComponent } from "./ref-form-detail/ref-form-detail.component";
import { RefFormRoleMappingComponent } from "./ref-form-role-mapping/ref-form-role-mapping.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UCSearchModule } from "@adins/ucsearch";

@NgModule({
    imports: [
        RefFormRoutingModule,
        UcpagingModule,
        UclookupgenericModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        HttpModule,
        UcShowErrorsModule,
        NgbModule,
        CommonModule,
        UCSearchModule,
        UcgridfooterModule
    ],
    declarations: [
        RefFormDetailComponent,
        RefFormPagingComponent,
        RefFormRoleMappingComponent
    ],
    providers: [
      NGXToastrService
    ]
  })
  export class RefFormModule { }
  