
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcpagingModule } from '@adins/ucpaging';
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcgridviewModule } from '@adins/ucgridview';
import { UcaddressModule } from '@adins/ucaddress';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UcuploadModule } from '@adins/ucupload';
import { UcdropdownlistModule } from '@adins/ucdropdownlist';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { UcDirectiveUpperCaseModule } from '@adins/uc-directive-upper-case';
import { UcDirectiveValidateDateModule } from '@adins/uc-directive-validate-date';
import { Ucdropdownsearch2Module } from '@adins/ucdropdownsearch2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/shared/interceptor/httpconfig.interceptor';
import { LogsInterceptor } from 'app/shared/interceptor/logs.interceptor';
import { LoggingService } from '@adins/fe-core';

@NgModule({
    exports: [
        UcDirectiveUpperCaseModule,
        UcDirectiveValidateDateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UcSubsectionModule,
        UcpagingModule,
        UCSearchModule,
        UcgridfooterModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcShowErrorsModule,
        UcaddressModule,
        UcgridviewModule,
        MatCheckboxModule,
        UcuploadModule,
        UcdropdownlistModule,
        UcaddtotempModule,
        Ucdropdownsearch2Module
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UcSubsectionModule,
        UcpagingModule,
        UCSearchModule,
        UcgridfooterModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcShowErrorsModule,
        UcaddressModule,
        UcgridviewModule,
        MatCheckboxModule,
        UcuploadModule,
        UcdropdownlistModule,
        UcaddtotempModule,
        UcDirectiveUpperCaseModule,
        UcDirectiveValidateDateModule,
        Ucdropdownsearch2Module
    ],
    providers: [
      LoggingService,
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LogsInterceptor, multi: true },
    ]
})

export class AdInsModule { }
