 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
        component: AssetConfigurationPagingComponent,
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
