
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcpagingModule } from '@adins/ucpaging';
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcgridviewModule } from '@adins/ucgridview';
import { UcaddressModule } from '@adins/ucaddress';
import { MatCheckboxModule } from '@angular/material';
import { UcuploadModule } from '@adins/ucupload';
import { UcdropdownlistModule } from '@adins/ucdropdownlist';
import { UcaddtotempModule } from '@adins/ucaddtotemp';

@NgModule({
    exports: [
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
        UcaddtotempModule
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
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
        UcaddtotempModule
    ],
    declarations: [
    ]
})

export class AdInsModule { }
