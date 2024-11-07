
import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";

@NgModule({
  exports: [
    TranslateModule
  ],
  imports: [
    TranslateModule.forChild(),
  ],
  declarations: []
})

export class AdInsSharedModule { }