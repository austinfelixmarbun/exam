import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SupplierComponent } from './supplier.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    data: {
      title: 'Supplier'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }
