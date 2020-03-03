import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypePagingComponent } from './asset-type/asset-type-paging/asset-type-paging.component';
import { AssetTypeAddEditComponent } from './asset-type/asset-type-add-edit/asset-type-add-edit.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingComponent { }
