
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-category/asset-category-paging/asset-category-paging.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master/asset-document-master-paging-information/asset-document-master-paging-information.component';
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
 
const routes: Routes = [
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
                path: 'Category/Detail',
                component: AssetCategoryAddEditComponent,
                data: {
                    title: 'Asset Category Detail'
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
                path: 'Accessory/Detail',
                component: AssetAccessoryAddEditComponent,
                data: {
                    title: 'Asset Accessory Detail'
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
                path: 'Document/Detail',
                component: AssetDocumentAddEditComponent,
                data: {
                    title: 'Asset Document Detail'
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
                path: 'DocumentMaster/Detail',
                component: AssetDocumentMasterAddEditComponent,
                data: {
                    title: 'Asset Document Detail'
                },
            },
            {
                path: 'NegativeAsset/Paging',
                component: NegativeAssetComponent,
                data: {
                    title: 'Negative Asset'
                },
            },
            {
                path: 'NegativeAsset/Detail',
                component: NegativeAssetDetailComponent,
                data: {
                    title: 'Negative Asset'
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
