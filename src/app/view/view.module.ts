import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule, UcSubsectionComponent } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { ViewRoutingModule } from "./view-routing.module";
import { UcgridviewComponent } from "@adins/ucgridview";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { createTranslateLoader } from "app/app.module";
import { HttpClient } from "@angular/common/http";
import { SurveyTaskViewModule } from "./survey-task-view/survey-task-view.module";
import { SharedModule } from "app/shared/shared.module";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
@NgModule({
  imports: [
    AdInsModule,
    ViewRoutingModule,
    CommonModule,
    HttpModule,
    UcviewgenericModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule,
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
  declarations: [],
  entryComponents: [
    UcgridviewComponent,
    UcSubsectionComponent
  ]

})
export class ViewModule { }