import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProductHOPagingComponent } from "./product-HO/product-ho-paging/product-ho-paging.component";
import { ProductHOAddComponent } from "./product-HO/product-ho-add/product-ho-add.component";
import { ProductHoAdddetailComponent } from "./product-HO/product-ho-adddetail/product-ho-adddetail.component";
import { ProdOfferingAddComponent } from './prod-offering/prod-offering-add/prod-offering-add.component';
import { ProdOfferingPagingComponent } from './prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProductHODeactivatePagingComponent } from "./product-ho/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-ho/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { ProductHOViewComponent } from "./product-HO/product-ho-view/product-ho-view.component";
import { ProductOfferingViewComponent } from "./prod-offering/prod-offering-view/product-offering-view.component";
import { ProductOfferingDeactivatePagingComponent } from "./prod-offering/prod-offering-deactivate-paging/product-offering-deactivate.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'HOpaging',
        component: ProductHOPagingComponent,
        data: {
          title: 'Product HO Paging'
        }
      },
      {
        path: 'HOadd',
        component: ProductHOAddComponent,
        data: {
          title: 'Product HO Add'
        }
      },
      {
        path: 'HOadddetail',
        component: ProductHoAdddetailComponent,
        loadChildren: "./product-HO/product-ho-adddetail/product-ho-adddetail.module#ProductHOAddDetailModule",
        data: {
          title: 'Product HO Add Detail'
        }
      },
      {
        path: 'prod-offering/paging',
        component: ProdOfferingPagingComponent,
        data: {
          title: 'Paging'
        },
      },
      {
        path: 'prod-offering/add',
        component: ProdOfferingAddComponent,
        data: {
          title: 'Add'
        },
      },
      {
        path: 'HODeactivate',
        component: ProductHODeactivatePagingComponent,
        data: {
          title: 'Product HO Deactivate Paging'
        }
      },
      {
        path: 'HODeactivate/edit',
        component: ProductHODeactivateEditComponent,
        data: {
          title: 'Product HO Deactivate'
        }
      },
      {
        path: 'HOView',
        component: ProductHOViewComponent,
        data: {
          title: 'Product HO View'
        }
      },
      {
        path: 'OfferingView',
        component: ProductOfferingViewComponent,
        data: {
          title: 'Product Offering View'
        }
      },
      {
        path: 'OfferingDeactivate',
        component: ProductOfferingDeactivatePagingComponent,
        data: {
          title: 'Product Offering Deactivate'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
