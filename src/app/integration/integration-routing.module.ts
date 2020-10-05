import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DailyMasterContinuousFormComponent } from "./daily-master-continuous-form/daily-master-continuous-form.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'SendDailyMaster',
            component: DailyMasterContinuousFormComponent,
            data: {
                title: 'Send Daily Master'
            }
        },
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IntegrationRoutingModule { }
