import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import {LookupEmployeeComponent} from './lookup/lookup-employee/lookup-employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { LookupzipcodeComponent } from './lookup/lookupzipcode/lookupzipcode.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
<<<<<<< HEAD
        LookupEmployeeComponent,
        ErrorDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ErrorDialogComponent,
=======
        LookupzipcodeComponent,
        NgbModule,
        HttpModule,
        TranslateModule
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
>>>>>>> 88aa92a9b461f10e209dabc503c107b273252842
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
<<<<<<< HEAD
        LookupEmployeeComponent,
        ErrorDialogComponent

=======
        LookupzipcodeComponent
>>>>>>> 88aa92a9b461f10e209dabc503c107b273252842
    ]
})

export class SharingModule { }
