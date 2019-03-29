import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SupplierComponent } from 'app/supplier/supplier.component';
import { SupplierAddComponent } from 'app/supplier/supplier-add/supplier-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupplierComponent,
        data: {
          title: 'Supplier'
        },
      },
      {
        path: 'add',
        component: SupplierAddComponent,
        data: {
          title: 'Add Supplier'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }
