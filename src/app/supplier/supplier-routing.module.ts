import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierComponent } from 'app/supplier/supplier.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'supplier',
        component: SupplierComponent,
        data: {
          title: 'Supplier Paging'
        },
      },
      {
        path: 'supplier/add',
        component: SupplierAddComponent,
        data: {
          title: 'Supplier Maintenance Add Edit'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }
