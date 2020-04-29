import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcaddressModule } from '@adins/ucaddress';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { SurveyOrderTaskWfComponent } from './survey-order-task-wf/survey-order-task-wf.component';


@NgModule({
  imports: [
    SurveyRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    UcpagingModule,
    UcSubsectionModule,
    SharingComponentModule,
    ReactiveFormsModule,
    UcaddressModule,
    UclookupgenericModule,
    UcviewgenericModule,
    UcShowErrorsModule
  ],
  declarations: [
    SurveyOrderComponent,
    SurveyOrderTaskComponent,
    SurveyOrderViewComponent,
    SurveyTaskViewComponent,
    SurveyOrderTaskWfComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class SurveyModule { }
 