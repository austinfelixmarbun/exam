import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent
    ]
})

export class SharingModule { }
