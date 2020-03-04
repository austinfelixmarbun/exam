import { AssetRoutingComponent } from "./asset-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetTypeAddEditComponent } from "./asset-type/asset-type-add-edit/asset-type-add-edit.component";
import { AssetTypePagingComponent } from "./asset-type/asset-type-paging/asset-type-paging.component";
import { NgModule } from "@angular/core";
import { ShowErrorsComponent } from "app/test-new/show-errors.component";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditMemberComponent } from "./asset-scheme/asset-scheme-add-edit-member/asset-scheme-add-edit-member.component";
import { AssetSchemeAddEditInformationComponent } from "./asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component";
// import { ShowErrorsComponent } from "./app/test-new/show-errors.component";

@NgModule({
    imports: [
      AssetRoutingComponent,
      CommonModule,
      FormsModule,
      HttpModule,
      UCSearchModule,
      UcgridfooterModule,
      UcpagingModule,
      NgbModule,
      ReactiveFormsModule,
      UcSubsectionModule
    ],
    declarations: [
        AssetTypePagingComponent,
        ShowErrorsComponent,
        AssetSchemePagingComponent,
        AssetSchemeAddEditMemberComponent,
        AssetSchemeAddEditInformationComponent
    ]
  })
  export class AssetModule { }
  