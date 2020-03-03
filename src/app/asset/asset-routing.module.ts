
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-category/asset-category-paging/asset-category-paging.component';
import { AssetCategoryInformationComponent } from './asset-category/asset-category-information/asset-category-information.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetAccessoryInformationComponent } from './asset-accessory/asset-accessory-information/asset-accessory-information.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentInformationComponent } from './asset-document/asset-document-information/asset-document-information.component';
 
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
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssetRoutingComponent { }
