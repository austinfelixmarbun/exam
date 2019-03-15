import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import {LookupEmployeeComponent} from './lookup/lookup-employee/lookup-employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
        LookupEmployeeComponent

    ],
    imports: [
        CommonModule,
        FormsModule,

        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
        LookupEmployeeComponent

    ]
})

export class SharingModule { }
