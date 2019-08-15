import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssetPagingComponent } from "./asset-paging/asset-paging.component";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'paging',
          component: AssetPagingComponent,
          data: {
            title: 'Asset Paging'
          }
        },
        {
          path: 'detail',
          component: AssetDetailComponent,
          data: {
            title: 'Asset Detail'
          }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingModule { }
