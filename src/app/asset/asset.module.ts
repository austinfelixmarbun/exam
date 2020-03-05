import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetRoutingModule } from "app/test/test-paging-v3/asset/asset-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { AssetRoutingComponent } from "./asset-routing.module";
import { ShowErrorsComponent } from "app/test-new/show-errors.component";
import { RouterModule } from "@angular/router";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { AssetCategoryPagingComponent } from "./asset-category/asset-category-paging/asset-category-paging.component";
// import { AssetCategoryInformationComponent } from "./asset-category/asset-category-information/asset-category-information.component";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';

// import { AssetAccessoryInformationComponent } from './asset-accessory/asset-accessory-information/asset-accessory-information.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
// import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master/asset-document-master-paging-information/asset-document-master-paging-information.component';
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
import { AssetMasterComponent } from "./asset-master/asset-master-paging/asset-master.component";
import { AssetMasterAddEditParentComponent } from "./asset-master/asset-master-add-edit-parent/asset-master-add-edit-parent.component";
import { AssetMasterAddEditChildComponent } from "./asset-master/asset-master-add-edit-child/asset-master-add-edit-child.component";

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
    RouterModule,
    UcSubsectionModule,
    UcviewgenericModule,
    UclookupgenericModule,
    SharingComponentModule,
    UcviewgenericModule
  ],
  declarations: [
    AssetConfigurationPagingComponent,
    AssetCategoryPagingComponent,
    // AssetCategoryInformationComponent,  
    // AssetAccessoryInformationComponent,
    AssetAccessoryPagingComponent,
    AssetDocumentPagingComponent,
    // AssetDocumentInformationComponent,
    AssetDocumentMasterPagingComponent,
    // AssetDocumentMasterPagingInformationComponent,
    NegativeAssetComponent,
    NegativeAssetDetailComponent,
    ShowErrorsComponent,
    AssetAccessoryPagingComponent,
    AssetDocumentPagingComponent,
    AssetDocumentMasterPagingComponent,
    AssetAccessoryAddEditComponent,
    AssetCategoryAddEditComponent,
    AssetDocumentAddEditComponent,
    AssetDocumentMasterAddEditComponent,
    AssetMasterComponent,
    AssetMasterAddEditParentComponent,
    AssetMasterAddEditChildComponent
  ]
})
export class AssetModule { }