import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypePagingComponent } from './asset-type/asset-type-paging/asset-type-paging.component';
import { AssetTypeAddEditComponent } from './asset-type/asset-type-add-edit/asset-type-add-edit.component';
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditInformationComponent } from './asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component';
import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-category/asset-category-paging/asset-category-paging.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
import { AssetMasterComponent } from './asset-master/asset-master-paging/asset-master.component';
import { AssetMasterAddEditChildComponent } from './asset-master/asset-master-add-edit-child/asset-master-add-edit-child.component';
import { AssetMasterAddEditParentComponent } from './asset-master/asset-master-add-edit-parent/asset-master-add-edit-parent.component';
import { AddAssetSchemeComponent } from './asset-scheme/add-asset-scheme/add-asset-scheme.component';
import { AssetSchemeMemberComponent } from './asset-scheme/asset-scheme-member/asset-scheme-member.component';
import { UploadAssetMasterComponent } from './asset-master/upload-asset-master/upload-asset-master.component';
import { ReviewUploadAssetMasterPagingComponent } from './asset-master/review-upload-asset-master/review-upload-asset-master-paging/review-upload-asset-master-paging.component';
import { ReviewUploadAssetMasterDetailComponent } from './asset-master/review-upload-asset-master/review-upload-asset-master-detail/review-upload-asset-master-detail.component';
import { NegativeAssetUploadComponent } from './negative-asset/negative-asset-upload/negative-asset-upload.component';
import { ReviewUploadNegativeAssetPagingComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-paging/review-upload-negative-asset-paging.component';
import { ReviewUploadNegativeAssetDetailComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-detail/review-upload-negative-asset-detail.component';
import { AssetAttributeComponent } from './asset-attribute/asset-attribute.component'; 
import { AssetAttributeDetailComponent } from './asset-attribute/asset-attribute-detail/asset-attribute-detail.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.ASSET_TYPE_PAGING,
        component: AssetTypePagingComponent,
        data: {
          title: 'Asset Type Paging'
        }
      },
      {
        path: PathConstant.ASSET_TYPE_DETAIL,
        component: AssetTypeAddEditComponent,
        data: {
          title: 'Asset Type Add Edit'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_PAGING,
        component: AssetSchemePagingComponent,
        data: {
          title: 'Asset Scheme Paging'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_MBR_DETAIL,
        component: AssetSchemeMemberComponent,
        data: {
          title: 'Asset Scheme Member Detail'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_ADD_MBR,
        component: AddAssetSchemeComponent,
        data: {
          title: 'Asset Scheme Member Add'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_INFO_DETAIL,
        component: AssetSchemeAddEditInformationComponent,
        data: {
          title: 'Asset Scheme Information Add Edit'
        }
      },
      {
        path: PathConstant.ASSET_CONFIG_PAGING,
        component: AssetConfigurationPagingComponent,
        data: {
          title: 'Asset Configuration Paging'
        },
      },
      {
        path: PathConstant.ASSET_CATEGORY_PAGING,
        component: AssetCategoryPagingComponent,
        data: {
          title: 'Asset Cateogry Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_PAGING,
        component: AssetDocumentPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_MASTER_PAGING,
        component: AssetDocumentMasterPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: PathConstant.ASSET_CATEGORY_DETAIL,
        component: AssetCategoryAddEditComponent,
        data: {
          title: 'Asset Category Detail'
        },
      },
      {
        path: PathConstant.ASSET_CATEGORY_PAGING,
        component: AssetAccessoryPagingComponent,
        data: {
          title: 'Asset Accessory Paging'
        },
      },
      {
        path: PathConstant.ASSET_ATTR_PAGING,
        component: AssetAttributeComponent,
        data: {
          title: 'Asset Attribute Paging'
        },
      },
      {
        path: PathConstant.ASSET_ATTR_DETAIL,
        component: AssetAttributeDetailComponent,
        data: {
          title: 'Asset Attribute Detail'
        },
      },
      {
        path: PathConstant.ASSET_ACC_DETAIL,
        component: AssetAccessoryAddEditComponent,
        data: {
          title: 'Asset Accessory Detail'
        },
      },
      {
        path: PathConstant.ASSET_DOC_PAGING,
        component: AssetDocumentPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_DETAIL,
        component: AssetDocumentAddEditComponent,
        data: {
          title: 'Asset Document Detail'
        },
      },
      {
        path: PathConstant.ASSET_DOC_MASTER_PAGING,
        component: AssetDocumentMasterPagingComponent,
        data: {
          title: 'Asset Document Master Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_MASTER_DETAIL,
        component: AssetDocumentMasterAddEditComponent,
        data: {
          title: 'Asset Document Master Detail'
        },
      },
      {
        path: PathConstant.ASSET_NEG_PAGING,
        component: NegativeAssetComponent,
        data: {
          title: 'Negative Asset'
        },
      },
      {
        path: PathConstant.ASSET_NEG_DETAIL,
        component: NegativeAssetDetailComponent,
        data: {
          title: 'Negative Asset'
        },
      },
      {
        path: PathConstant.ASSET_NEG_UPLOAD,
        component: NegativeAssetUploadComponent,
        data: {
          title: 'Upload Negative Asset'
        },
      },
      {
        path: PathConstant.ASSET_NEG_RVW_UPLOAD_PAGING,
        component: ReviewUploadNegativeAssetPagingComponent,
        data: {
          title: 'Review Upload Negative Asset Paging'
        },
      },
      {
        path: PathConstant.ASSET_NEG_RVW_UPLOAD_DETAIL,
        component: ReviewUploadNegativeAssetDetailComponent,
        data: {
          title: 'Review Upload Negative Asset Detail'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_PAGING,
        component: AssetMasterComponent,
        data: {
          title: 'Asset Master'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_DETAIL,
        component: AssetMasterAddEditParentComponent,
        data: {
          title: 'Asset Master Add Edit Parent'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_CHILD,
        component: AssetMasterAddEditChildComponent,
        data: {
          title: 'Asset Master Add Edit Child'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_UPLOAD,
        component: UploadAssetMasterComponent,
        data: {
          title: 'Upload Asset Master'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_RVW_UPLOAD_PAGING,
        component: ReviewUploadAssetMasterPagingComponent,
        data: {
          title: 'Review Upload Asset Master Paging'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_RVW_UPLOAD_DETAIL,
        component: ReviewUploadAssetMasterDetailComponent,
        data: {
          title: 'Review Upload Asset Master Detail'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingComponent { }
