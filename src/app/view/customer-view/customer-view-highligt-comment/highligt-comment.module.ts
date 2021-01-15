import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighligtCommentRoutingModule } from './highligt-comment-routing.module';
import { CustomerViewHighligtCommentComponent } from './customer-view-highligt-comment.component';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [CustomerViewHighligtCommentComponent],
  imports: [
    CommonModule,
    HighligtCommentRoutingModule,UcSubsectionModule
    

  ]
})
export class HighligtCommentModule { }

