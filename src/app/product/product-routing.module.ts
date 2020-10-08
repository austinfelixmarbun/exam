import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdOfferingAddComponent } from './prod-offering/prod-offering-add/prod-offering-add.component';
import { ProdOfferingPagingComponent } from './prod-offering/prod-offering-paging/prod-offering-paging.component';
import { ProdOfferingAddDetailComponent } from './prod-offering/prod-offering-add-detail/prod-offering-add-detail.component'
import { ProductHOPagingComponent } from './product-HO/product-ho-paging/product-ho-paging.component';
import { ProductHOAddComponent } from './product-HO/product-ho-add/product-ho-add.component';
import { ProductHoAdddetailComponent } from "./product-HO/product-ho-adddetail/product-ho-adddetail.component";
import { ProductHODeactivatePagingComponent } from "./product-HO/product-ho-deactivate-paging/product-ho-deactivate.component";
import { ProductHODeactivateEditComponent } from "./product-HO/product-ho-deactivate-edit/product-ho-deactivate-edit.component";
import { ProductHOViewComponent } from "./product-HO/product-ho-view/product-ho-view.component";
import { ProductOfferingViewComponent } from "./prod-offering/prod-offering-view/product-offering-view.component";
import { ProductHOApprovalComponent } from "./product-HO/product-ho-approval/product-ho-approval.component";
import { ProductHOApprovalDetailComponent } from "./product-HO/product-ho-approval-detail/product-ho-approval-detail.component";
import { ProductOfferingApprovalComponent } from "./prod-offering/prod-offering-approval/product-offering-approval.component";
import { ProductOfferingApprovalDetailComponent } from "./prod-offering/prod-offering-approval-detail/product-offering-approval-detail.component";
import { ProductHODeactivateApprovalComponent } from "./product-HO/product-ho-deact-apv/product-ho-deact-apv.component";
import { ProductHODeactivateApprovalDetailComponent } from "./product-HO/product-ho-deact-apv-detail/product-ho-deact-apv-detail.component";
import { ProductOfferingDeactivatePagingComponent } from "./prod-offering/prod-offering-deactivate-paging/product-offering-deactivate.component";
import { ProductOfferingDeactivateApprovalComponent } from "./prod-offering/prod-offering-deact-apv/product-offering-deact-apv.component";
import { ProductOfferingDeactivateApprovalDetailComponent } from "./prod-offering/prod-offering-deact-apv-detail/product-offering-deact-apv-detail.component";
import { ProductOfferingDeactivateEditComponent } from "./prod-offering/prod-offering-deactivate-edit/product-offering-deactivate-edit.component";
import { ProductReturnHoPagingComponent } from './product-HO/product-return-ho-paging/product-return-ho-paging.component';
import { ProdOfferingReturnPagingComponent } from './prod-offering/prod-offering-return-paging/prod-offering-return-paging.component'; 
import { ProductHoReviewPagingComponent } from './product-HO/product-ho-review-paging/product-ho-review-paging.component';
import { ProductHoReviewComponent } from './product-HO/product-ho-review/product-ho-review.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'ProdOffering/Paging',
          component: ProdOfferingPagingComponent,
          data: {
            title: 'Paging'
          },
        },
        {
          path: 'ProdOffering/Returnpaging',
          component: ProdOfferingReturnPagingComponent,
          data: {
            title: 'Return Paging'
          },
        },
        {
          path: 'ProdOffering/add',
          component: ProdOfferingAddComponent,
          data: {
            title: 'Add'
          },
        },
        {
          path: 'ProdOffering/AddDetail',
          component: ProdOfferingAddDetailComponent,
          loadChildren: "./prod-offering/prod-offering-add-detail/prod-offering-add-detail.module#ProdOfferingAddDetailModule",
          data: {
            title: 'Add Detail'
          },
        },
        {
          path: 'HOpaging',
          component: ProductHOPagingComponent,
          data: {
              title: 'Product HO Paging'
          }
      },
      {
          path: 'HOReturnPaging',
          component: ProductReturnHoPagingComponent,
          data: {
              title: 'Product Return HO Paging'
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
      {
        path: 'HODeactivate',
        component: ProductHODeactivatePagingComponent,
        data: {
          title: 'Product HO Deactivate Paging'
        }
      },
      {
        path: 'HODeactivate/edit',
        component: ProductHODeactivateEditComponent,
        data: {
          title: 'Product HO Deactivate'
        }
      },
      {
        path: 'HOView',
        component: ProductHOViewComponent,
        data: {
          title: 'Product HO View'
        }
      },
      {
        path: 'OfferingView',
        component: ProductOfferingViewComponent,
        data: {
          title: 'Product Offering View'
        }
      },
      {
        path: 'HOApproval',
        component: ProductHOApprovalComponent,
        data: {
          title: 'Product HO Approval'
        }
      },
      {
        path: 'HOApproval/Detail',
        component: ProductHOApprovalDetailComponent,
        data: {
          title: 'Product HO Approval Detail'
        }
      },
      {
        path: 'OfferingApproval',
        component: ProductOfferingApprovalComponent,
        data: {
          title: 'Product Offering Approval'
        }
      },
      {
        path: 'OfferingApproval/Detail',
        component: ProductOfferingApprovalDetailComponent,
        data: {
          title: 'Product Offering Approval Detail'
        }
      },
      {
        path: 'HODeactivateApproval',
        component: ProductHODeactivateApprovalComponent,
        data: {
          title: 'Product HO Deactivate Approval'
        }
      },
      {
        path: 'HODeactivateApproval/Detail',
        component: ProductHODeactivateApprovalDetailComponent,
        data: {
          title: 'Product HO Deactivate Approval Detail'
        }
      },
      {
        path: 'OfferingDeactivate',
        component: ProductOfferingDeactivatePagingComponent,
        data: {
          title: 'Product Offering Deactivate Paging'
        }
      },
      {
        path: 'OfferingDeactivate/edit',
        component: ProductOfferingDeactivateEditComponent,
        data: {
          title : 'Product Offering Deactivate'
        }
      },
      {
        path: 'OfferingDeactivateApproval',
        component: ProductOfferingDeactivateApprovalComponent,
        data: {
          title: 'Product Offering Deactivate Approval'
        }
      },
      {
        path: 'OfferingDeactivateApproval/Detail',
        component: ProductOfferingDeactivateApprovalDetailComponent,
        data: {
          title: 'Product Offering Deactivate Approval Detail'
        }
      },
      {
        path: 'HOReview',
        component: ProductHoReviewComponent,
        data: {
          title: 'Product HO Review'
        }
      },
      {
        path: 'HOReviewPaging',
        component: ProductHoReviewPagingComponent,
        data: {
          title: 'Product HO Review Paging'
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
