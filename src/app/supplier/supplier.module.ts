import { NgModule } from '@angular/core';
import { SupplierComponent} from 'app/supplier/supplier.component';
import { SupplierRoutingModule } from "app/supplier/supplier-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SupplierAddComponent } from 'app/supplier/supplier-add/supplier-add.component';
import { SharingModule } from 'app/shared/sharing.module';
import { NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    imports: [
        SupplierRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule,
        NgSelectModule,
        ReactiveFormsModule,
        CommonModule,
        NgxSpinnerModule,
        SharingModule
    ],
    declarations: [
        SupplierComponent,
        SupplierAddComponent
        
    ]
})
export class SupplierModule { }
