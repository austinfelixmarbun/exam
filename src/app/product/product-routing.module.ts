import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProductHOPagingComponent } from "./product-HO/product-ho-paging/product-ho-paging.component";
import { ProductHOAddComponent } from "./product-HO/product-ho-add/product-ho-add.component";

const routes: Routes =[
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
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdOfferingAddComponent } from './prod-offering/prod-offering-add/prod-offering-add.component';
import { ProdOfferingPagingComponent } from './prod-offering/prod-offering-paging/prod-offering-paging.component';

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
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class ProductRoutingModule{}