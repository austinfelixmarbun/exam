import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { UploadSettingPagingComponent } from "./upload-setting/upload-setting/upload-setting-paging.component";
import { UploadSettingEditComponent } from "./upload-setting/upload-setting-edit/upload-setting-edit.component";
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class UploadRoutingModule { }
