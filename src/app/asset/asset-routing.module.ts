import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypePagingComponent } from './asset-type/asset-type-paging/asset-type-paging.component';
import { AssetTypeAddEditComponent } from './asset-type/asset-type-add-edit/asset-type-add-edit.component';
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditMemberComponent } from './asset-scheme/asset-scheme-add-edit-member/asset-scheme-add-edit-member.component';
import { AssetSchemeAddEditInformationComponent } from './asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component';

import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-category/asset-category-paging/asset-category-paging.component';
import { AssetCategoryInformationComponent } from './asset-category/asset-category-information/asset-category-information.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetAccessoryInformationComponent } from './asset-accessory/asset-accessory-information/asset-accessory-information.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentInformationComponent } from './asset-document/asset-document-information/asset-document-information.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master/asset-document-master-paging-information/asset-document-master-paging-information.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'type/paging',
        component: AssetTypePagingComponent,
        data: {
          title: 'Asset Type Paging'
        }
      },
      {
        path: 'type/detail',
        component: AssetTypeAddEditComponent,
        data: {
          title: 'Asset Type Add Edit'
        }
      },
      {
        path: 'scheme/paging',
        component: AssetSchemePagingComponent,
        data: {
          title: 'Asset Scheme Paging'
        }
      },
      {
        path: 'scheme/memberDetail',
        component: AssetSchemeAddEditMemberComponent,
        data: {
          title: 'Asset Scheme Member Add Edit'
        }
      },
      {
        path: 'scheme/informationDetail',
        component: AssetSchemeAddEditInformationComponent,
        data: {
          title: 'Asset Scheme Information Add Edit'
        }
      }
    ]
  }
    {
    path: '',
    children: [
      {
        path: 'Configuration/Paging',
        component: AssetConfigurationPagingComponent,
        data: {
          title: 'Asset Configuration Paging'
        },
      },
      {
        path: 'Category/Paging',
        component: AssetCategoryPagingComponent,
        data: {
          title: 'Asset Cateogry Paging'
        },
      },

      {
        path: 'Category/CategoryInformation',
        component: AssetCategoryInformationComponent,
        data: {
          title: 'Asset Category Information'
        },
      },
      {
        path: 'Accessory/Paging',
        component: AssetAccessoryPagingComponent,
        data: {
          title: 'Asset Accessory Paging'
        },
      },
      {
        path: 'Accessory/AccessoryInformation',
        component: AssetAccessoryInformationComponent,
        data: {
          title: 'Asset Accessory Information'
        },
      },
      {
        path: 'Document/Paging',
        component: AssetDocumentPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: 'Document/DocumentInformation',
        component: AssetDocumentInformationComponent,
        data: {
          title: 'Asset DocumentInformation'
        },
      },
      {
        path: 'DocumentMaster/Paging',
        component: AssetDocumentMasterPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: 'DocumentMaster/DocumentMasterInformation',
        component: AssetDocumentMasterPagingInformationComponent,
        data: {
          title: 'Asset DocumentInformation'
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
