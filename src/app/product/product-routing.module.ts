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
import { ProductHoReviewComponent } from './product-HO/product-ho-review/product-ho-review.component';
import { ProdOfferingReviewPagingComponent } from './prod-offering/prod-offering-review-paging/prod-offering-review-paging.component';
import { ProdOfferingReviewComponent } from './prod-offering/prod-offering-review/prod-offering-review.component';
import { ProductHoReviewPagingComponent } from './product-HO/product-ho-review-paging/product-ho-review-paging.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: PathConstant.PROD_OFFERING_PAGING,
          component: ProdOfferingPagingComponent,
          data: {
            title: 'Paging'
          },
        },
        {
          path: PathConstant.PROD_OFFERING_RTN_PAGING,
          component: ProdOfferingReturnPagingComponent,
          data: {
            title: 'Return Paging'
          },
        },
        {
          path: PathConstant.PROD_OFFERING_ADD,
          component: ProdOfferingAddComponent,
          data: {
            title: 'Add'
          },
        },
        {
          path: PathConstant.PROD_OFFERING_ADD_DETAIL,
          component: ProdOfferingAddDetailComponent,
          loadChildren: "./prod-offering/prod-offering-add-detail/prod-offering-add-detail.module#ProdOfferingAddDetailModule",
          data: {
            title: 'Add Detail'
          },
        },
        {
          path: PathConstant.HO_PAGING,
          component: ProductHOPagingComponent,
          data: {
              title: 'Product HO Paging'
          }
      },
      {
          path: PathConstant.HO_RTN_PAGING,
          component: ProductReturnHoPagingComponent,
          data: {
              title: 'Product Return HO Paging'
          }
      },
      {
          path: PathConstant.HO_ADD,
          component: ProductHOAddComponent,
          data: {
              title: 'Product HO Add'
          }
      },
      {
        path: PathConstant.HO_ADD_DETAIL,
        component: ProductHoAdddetailComponent,
        loadChildren: "./product-HO/product-ho-adddetail/product-ho-adddetail.module#ProductHOAddDetailModule",
        data: {
          title: 'Product HO Add Detail'
        }
      },
      {
        path: PathConstant.HO_DEACTIVATE,
        component: ProductHODeactivatePagingComponent,
        data: {
          title: 'Product HO Deactivate Paging'
        }
      },
      {
        path: PathConstant.HO_DEACTIVATE_EDIT,
        component: ProductHODeactivateEditComponent,
        data: {
          title: 'Product HO Deactivate'
        }
      },
      {
        path: PathConstant.HO_VIEW,
        component: ProductHOViewComponent,
        data: {
          title: 'Product HO View'
        }
      },
      {
        path: PathConstant.OFFERING_VIEW,
        component: ProductOfferingViewComponent,
        data: {
          title: 'Product Offering View'
        }
      },
      {
        path: PathConstant.HO_APPRV,
        component: ProductHOApprovalComponent,
        data: {
          title: 'Product HO Approval'
        }
      },
      {
        path: PathConstant.HO_APPRV_DETAIL,
        component: ProductHOApprovalDetailComponent,
        data: {
          title: 'Product HO Approval Detail'
        }
      },
      {
        path: PathConstant.OFFERING_APPRV,
        component: ProductOfferingApprovalComponent,
        data: {
          title: 'Product Offering Approval'
        }
      },
      {
        path: PathConstant.OFFERING_APPRV_DETAIL,
        component: ProductOfferingApprovalDetailComponent,
        data: {
          title: 'Product Offering Approval Detail'
        }
      },
      {
        path: PathConstant.HO_DEACTIVATE_APPRV,
        component: ProductHODeactivateApprovalComponent,
        data: {
          title: 'Product HO Deactivate Approval'
        }
      },
      {
        path: PathConstant.HO_DEACTIVATE_APPRV_DETAIL,
        component: ProductHODeactivateApprovalDetailComponent,
        data: {
          title: 'Product HO Deactivate Approval Detail'
        }
      },
      {
        path: PathConstant.OFFERING_DEACTIVATE,
        component: ProductOfferingDeactivatePagingComponent,
        data: {
          title: 'Product Offering Deactivate Paging'
        }
      },
      {
        path: PathConstant.OFFERING_DEACTIVATE_EDIT,
        component: ProductOfferingDeactivateEditComponent,
        data: {
          title : 'Product Offering Deactivate'
        }
      },
      {
        path: PathConstant.OFFERING_DEACTIVATE_APPRV,
        component: ProductOfferingDeactivateApprovalComponent,
        data: {
          title: 'Product Offering Deactivate Approval'
        }
      },
      {
        path: PathConstant.OFFERING_DEACTIVATE_APPRV_DETAIL,
        component: ProductOfferingDeactivateApprovalDetailComponent,
        data: {
          title: 'Product Offering Deactivate Approval Detail'
        }
      },
      {
        path: PathConstant.HO_REVIEW_DETAIL,
        component: ProductHoReviewComponent,
        data: {
          title: 'Product HO Review'
        }
      },
      {
        path: PathConstant.HO_REVIEW,
        component: ProductHoReviewPagingComponent,
        data: {
          title: 'Product HO Review Paging'
        }
      },
      {
        path: PathConstant.OFFERING_REVIEW_DETAIL,
        component: ProdOfferingReviewComponent,
        data: {
          title: 'Product Offering Review'
        }
      },
      {
        path: PathConstant.OFFERING_REVIEW,
        component: ProdOfferingReviewPagingComponent,
        data: {
          title: 'Product Offering Review Paging'
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
