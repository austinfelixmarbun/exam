import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
        ErrorDialogComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
        ErrorDialogComponent
    ]
})

export class SharingModule { }
