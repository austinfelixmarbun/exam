import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorBranchViewComponent } from './vendor-branch-view/vendor-branch-view.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
import { VendorHoInfoComponent } from './vendor-ho-info/vendor-ho-info.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'VendorBranch',
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
        }
      },
      {
        path: 'VendorHolding',
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
        }
      },
      {
        path: 'VendorHO',
        component: VendorHoInfoComponent,
        data: {
          title: 'Vendor HO View'
        }
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorViewRoutingModule { }
