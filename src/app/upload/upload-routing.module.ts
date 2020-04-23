import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { UploadSettingPagingComponent } from "./upload-setting/upload-setting/upload-setting-paging.component";
import { UploadSettingEditComponent } from "./upload-setting/upload-setting-edit/upload-setting-edit.component";
import { UploadMonitoringAssetMasterComponent } from "./upload-monitoring-asset-master/upload-monitoring-asset-master.component";
import { UploadAssetMasterComponent } from "./upload-asset-master/upload-asset-master.component";
import { ReviewUploadAssetMasterPagingComponent } from "./review-upload-asset-master/review-upload-asset-master-paging/review-upload-asset-master-paging.component";
import { ReviewUploadAssetMasterDetailComponent } from "./review-upload-asset-master/review-upload-asset-master-detail/review-upload-asset-master-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'UploadMonitoringPaging',
        component: UploadMonitoringComponent,
        data: {
          title: 'Upload Monitoring'
        }
      },
      {
        path: 'UploadSettingPaging',
        component: UploadSettingPagingComponent,
        data: {
          title: 'Upload Setting Paging'
        }
      },
      {
        path: 'UploadSettingEdit',
        component: UploadSettingEditComponent,
        data: {
          title: 'Upload Setting Edit'
        }
      },
      {
        path: 'UploadMonitoringAssetMaster',
        component: UploadMonitoringAssetMasterComponent,
        data: {
          title: 'Upload Monitoring Asset Master'
        }
      }, 
      {
        path: 'UploadAssetMaster',
        component: UploadAssetMasterComponent,
        data: {
          title: 'Upload Asset Master'
        }
      },
      {
        path: 'ReviewUploadAssetMaster/Paging',
        component: ReviewUploadAssetMasterPagingComponent,
        data: {
          title: 'Review Upload Asset Master Paging'
        }
      },
      {
        path: 'ReviewUploadAssetMaster/Detail',
        component: ReviewUploadAssetMasterDetailComponent,
        data: {
          title: 'Review Upload Asset Master Detail'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class UploadRoutingModule { }
