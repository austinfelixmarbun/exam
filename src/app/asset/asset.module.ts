import { AssetRoutingComponent } from "./asset-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AssetRoutingModule } from "app/test/test-paging-v3/asset/asset-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetTypeAddEditComponent } from "./asset-type/asset-type-add-edit/asset-type-add-edit.component";
import { AssetTypePagingComponent } from "./asset-type/asset-type-paging/asset-type-paging.component";
import { ShowErrorsComponent } from "app/test-new/show-errors.component";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditMemberComponent } from "./asset-scheme/asset-scheme-add-edit-member/asset-scheme-add-edit-member.component";
import { AssetSchemeAddEditInformationComponent } from "./asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { RouterModule } from "@angular/router";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { AssetCategoryPagingComponent } from "./asset-category/asset-category-paging/asset-category-paging.component";
import { AssetCategoryInformationComponent } from "./asset-category/asset-category-information/asset-category-information.component";
import { AssetAccessoryInformationComponent } from './asset-accessory/asset-accessory-information/asset-accessory-information.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentInformationComponent } from './asset-document/asset-document-information/asset-document-information.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master/asset-document-master-paging-information/asset-document-master-paging-information.component';
 
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
      UcSubsectionModule,
      UcviewgenericModule
    ],
    declarations: [
        AssetTypePagingComponent,
        ShowErrorsComponent,
        AssetSchemePagingComponent,
        AssetSchemeAddEditMemberComponent,
        AssetSchemeAddEditInformationComponent,
        AssetConfigurationPagingComponent,
        AssetCategoryPagingComponent,
        AssetCategoryInformationComponent,  
       AssetAccessoryInformationComponent,
       AssetAccessoryPagingComponent,
       AssetDocumentPagingComponent,
       AssetDocumentInformationComponent,
       AssetDocumentMasterPagingComponent,
       AssetDocumentMasterPagingInformationComponent,
    ]
  })
  export class AssetModule { }
  