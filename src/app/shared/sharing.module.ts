import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UcSubsectionModule } from '@adins/uc-subsection';
import { MatStepperModule, MatIconModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  exports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    UCSearchModule,
    UcgridfooterModule,
    UcSubsectionModule,
    AngularFileUploaderModule,
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpModule,
    RouterModule,
    UCSearchModule,
    UcgridfooterModule,
    TranslateModule,
    UcSubsectionModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [
  ]
})

export class SharingModule { }
