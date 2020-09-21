import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOfferingViewComponent } from './product-offering-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductOfferingViewComponent,
        data: {
          title: 'Offering View'
        }
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdOfferingViewRoutingModule { }
