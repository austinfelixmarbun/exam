import { AssetRoutingComponent } from "./asset-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AssetTypeAddEditComponent } from "./asset-type/asset-type-add-edit/asset-type-add-edit.component";
import { AssetTypePagingComponent } from "./asset-type/asset-type-paging/asset-type-paging.component";
import { AssetSchemeAddEditInformationComponent } from "./asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { AssetCategoryPagingComponent } from "./asset-category/asset-category-paging/asset-category-paging.component";
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetSchemePagingComponent } from "./asset-scheme/asset-scheme-paging/asset-scheme-paging.component";
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
import { AssetMasterComponent } from "./asset-master/asset-master-paging/asset-master.component";
import { AssetMasterAddEditParentComponent } from "./asset-master/asset-master-add-edit-parent/asset-master-add-edit-parent.component";
import { AssetMasterAddEditChildComponent } from "./asset-master/asset-master-add-edit-child/asset-master-add-edit-child.component";
import { AddAssetSchemeComponent } from './asset-scheme/add-asset-scheme/add-asset-scheme.component';
import { AssetSchemeMemberComponent } from './asset-scheme/asset-scheme-member/asset-scheme-member.component';
import { UploadAssetMasterComponent } from './asset-master/upload-asset-master/upload-asset-master.component';
import { ReviewUploadAssetMasterDetailComponent } from "./asset-master/review-upload-asset-master/review-upload-asset-master-detail/review-upload-asset-master-detail.component";
import { ReviewUploadAssetMasterPagingComponent } from "./asset-master/review-upload-asset-master/review-upload-asset-master-paging/review-upload-asset-master-paging.component";
import { NegativeAssetUploadComponent } from './negative-asset/negative-asset-upload/negative-asset-upload.component';
import { ReviewUploadNegativeAssetPagingComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-paging/review-upload-negative-asset-paging.component';
import { ReviewUploadNegativeAssetDetailComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-detail/review-upload-negative-asset-detail.component';
import { UcaddtotempModule } from "@adins/ucaddtotemp";
import { RefAttrComponent } from './ref-attr/ref-attr.component';
import { RefAttrDetailComponent } from './ref-attr/ref-attr-detail/ref-attr-detail.component';

export const customCurrencyMaskConfig = {     
  align: "left",     
  allowNegative: true,     
  allowZero: true,     
  decimal: ".",     
  precision: 2,     
  prefix: "",     
  suffix: "",     
  thousands: ",",     
  nullable: false 
};

@NgModule({
  imports: [
    CommonModule,
    AssetRoutingComponent,
    AdInsModule,
    SharingComponentModule,
    UcaddtotempModule
  ],
  declarations: [
    AssetTypePagingComponent,
    AssetTypeAddEditComponent,
    AssetSchemePagingComponent,
    AssetSchemeAddEditInformationComponent,
    AssetConfigurationPagingComponent,
    AssetCategoryPagingComponent,
    AssetAccessoryPagingComponent,
    AssetDocumentPagingComponent,
    AssetDocumentMasterPagingComponent,
    AssetCategoryPagingComponent,
    NegativeAssetComponent,
    NegativeAssetDetailComponent,
    AssetAccessoryAddEditComponent,
    AssetCategoryAddEditComponent,
    AssetDocumentAddEditComponent,
    AssetDocumentMasterAddEditComponent,
    AssetMasterComponent,
    AssetMasterAddEditParentComponent,
    AssetMasterAddEditChildComponent,
    AddAssetSchemeComponent,
    AssetSchemeMemberComponent,
    UploadAssetMasterComponent,
    ReviewUploadAssetMasterDetailComponent,
    ReviewUploadAssetMasterPagingComponent,
    NegativeAssetUploadComponent,
    ReviewUploadNegativeAssetPagingComponent,
    ReviewUploadNegativeAssetDetailComponent,
    RefAttrComponent,
    RefAttrDetailComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class AssetModule { }