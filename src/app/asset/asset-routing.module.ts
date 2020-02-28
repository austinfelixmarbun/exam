
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-configuration/asset-category-paging/asset-category-paging.component';
import { AssetCategoryInformationComponent } from './asset-configuration/asset-category-information/asset-category-information.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'configuration/paging',
                component: AssetConfigurationPagingComponent,
                data: {
                    title: 'Master Type Maintenance Paging'
                },
            },
            {
                path: 'configuration/category',
                component: AssetCategoryPagingComponent,
                data: {
                    title: 'Master Type Maintenance Paging'
                },
            },

            {
                path: 'configuration/categoryInformation',
                component: AssetCategoryInformationComponent,
                data: {
                    title: 'Master Type Maintenance Paging'
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
