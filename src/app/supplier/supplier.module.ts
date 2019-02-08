import { NgModule } from '@angular/core';
import { SupplierComponent} from './supplier.component';
import { SupplierRoutingModule } from "./supplier-routing.module";
import { SearchComponent} from "../shared/search/search.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';

@NgModule({
    imports: [
        SupplierRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule,
        NgSelectModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        SupplierComponent,
        SearchComponent,
        SupplierAddComponent
        
    ]
})
export class SupplierModule { }
