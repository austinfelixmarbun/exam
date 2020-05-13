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
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { LookuproleModule } from "@adins/lookuprole";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcpagingModule } from "@adins/ucpaging";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcuploadModule } from '@adins/ucupload';
import { UploadNegativeAssetComponent } from './upload-negative-asset/upload-negative-asset.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        SharingComponentModule,
        UCSearchModule,
        UcgridfooterModule,
        ReactiveFormsModule,
        LookuproleModule,
        UcSubsectionModule,
        UploadRoutingModule,
        UcpagingModule,
        UcviewgenericModule,
        UcuploadModule
    ],
    declarations: [
        UploadMonitoringComponent,
        UploadSettingPagingComponent,
        UploadSettingEditComponent,
        UploadNegativeAssetComponent
    ],

})
export class UploadModule { }