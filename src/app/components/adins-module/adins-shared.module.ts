
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { createTranslateLoader } from "app/app.module";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";

@NgModule({
    exports: [
    ],
    imports: [
        TranslateModule.forChild({      
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
    ],
    declarations: [
    ]
})

export class AdInsSharedModule { }