import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHOViewComponent } from './product-ho-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductHOViewComponent,
        data: {
          title: 'Product HO View'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductHOViewRoutingModule { }
