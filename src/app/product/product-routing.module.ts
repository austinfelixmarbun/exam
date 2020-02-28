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