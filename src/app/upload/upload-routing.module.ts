import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { UploadSettingPagingComponent } from "./upload-setting/upload-setting/upload-setting-paging.component";
import { UploadSettingEditComponent } from "./upload-setting/upload-setting-edit/upload-setting-edit.component";
import { UploadMonitoringAssetMasterComponent } from "./upload-monitoring-asset-master/upload-monitoring-asset-master.component";

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class UploadRoutingModule { }
