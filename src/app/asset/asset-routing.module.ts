import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypePagingComponent } from './asset-type/asset-type-paging/asset-type-paging.component';
import { AssetTypeAddEditComponent } from './asset-type/asset-type-add-edit/asset-type-add-edit.component';
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditMemberComponent } from './asset-scheme/asset-scheme-add-edit-member/asset-scheme-add-edit-member.component';
import { AssetSchemeAddEditInformationComponent } from './asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component';

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
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingComponent { }
