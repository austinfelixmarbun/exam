import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
        ErrorDialogComponent,
        TranslateModule
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
        ErrorDialogComponent
    ]
})

export class SharingModule { }
