import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdOfferingAddComponent } from './prod-offering/prod-offering-add/prod-offering-add.component';
import { ProdOfferingPagingComponent } from './prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddDetailComponent } from './prod-offering/prod-offering-add-detail/prod-offering-add-detail.component'
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from "./product-HO/product-ho-adddetail/product-ho-adddetail.component";

const routes: Routes = [
    {
      path: '',
      children: [
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
          path: 'prod-offering/add-detail',
          component: ProdOfferingAddDetailComponent,
          data: {
            title: 'Add Detail'
          },
        },
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
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductRoutingModule { }
