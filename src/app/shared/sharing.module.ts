import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
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
        LookupzipcodeComponent,
        NgbModule,
        HttpModule,
        TranslateModule
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
        LookupzipcodeComponent
    ]
})

export class SharingModule { }
