import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorBranchViewComponent } from './vendor-branch-view/vendor-branch-view.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
import { VendorHoInfoComponent } from './vendor-ho-info/vendor-ho-info.component';
import { PathConstant } from 'app/shared/PathConstant';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_VENDOR_BRANCH,
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
        }
      },
      {
        path: PathConstant.VIEW_VENDOR_HOLDING,
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
        }
      },
      {
        path: PathConstant.VIEW_VENDOR_HO,
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
