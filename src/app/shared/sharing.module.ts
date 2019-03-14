import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
        TranslateModule
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent
    ]
})

export class SharingModule { }
