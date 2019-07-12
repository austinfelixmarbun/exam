import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'UploadMonitoringPaging',
        component: UploadMonitoringComponent,
        data: {
          title: 'Upload Monitoring'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRoutingModule { }
