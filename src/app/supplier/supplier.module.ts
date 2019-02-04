import { NgModule } from '@angular/core';
import { SupplierComponent} from './supplier.component';
import { SupplierRoutingModule } from "./supplier-routing.module";
import { SearchComponent} from "../shared/search/search.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SupplierRoutingModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SupplierComponent,
        SearchComponent
        
    ]
})
export class SupplierModule { }
