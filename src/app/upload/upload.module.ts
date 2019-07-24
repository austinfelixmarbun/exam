import { NgModule } from "@angular/core";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharingModule } from "app/shared/sharing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { UploadRoutingModule } from "./upload-routing.module";
import { UploadSettingPagingComponent } from './upload-setting/upload-setting/upload-setting-paging.component';
import { UploadSettingEditComponent } from './upload-setting/upload-setting-edit/upload-setting-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        SharingModule,
        ReactiveFormsModule,
        UploadRoutingModule
    ],
    declarations: [
        UploadMonitoringComponent,
        UploadSettingPagingComponent,
        UploadSettingEditComponent
    ],

})
export class UploadModule { }