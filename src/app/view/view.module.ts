import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { ViewRoutingModule } from "./view-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SurveyTaskViewModule } from "./survey-task-view/survey-task-view.module";
import { SharedModule } from "app/shared/shared.module";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
@NgModule({
    imports: [
        AdInsModule,
        ViewRoutingModule,
        CommonModule,
        NgbModule,
        SharingModule,
        ArchwizardModule,
        SharingComponentModule,
        FormsModule,
        ReactiveFormsModule,
        SurveyTaskViewModule,
        SharedModule,
        AdInsSharedModule
        //   TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [HttpClient]
        //     }
        // }),
    ],
    declarations: []
})
export class ViewModule { }