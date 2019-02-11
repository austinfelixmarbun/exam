import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        SearchComponent
    ]
})

export class SharingModule { }
