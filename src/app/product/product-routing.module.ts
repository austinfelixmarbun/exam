import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProductHOPagingComponent } from "./product-HO/product-ho-paging/product-ho-paging.component";
import { ProductHOAddComponent } from "./product-HO/product-ho-add/product-ho-add.component";
import { ProductHoAdddetailComponent } from "./product-HO/product-ho-adddetail/product-ho-adddetail.component";

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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductRoutingModule { }