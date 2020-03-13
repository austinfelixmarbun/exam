import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneralDataComponent } from "./general-data/general-data.component";
// import { OfficeMemberComponent } from "./office-member/office-member.component";
import { ProductComponentComponent } from "./product-component/product-component.component";

const routes: Routes = [
    {
        path: '',
        children: [
            // {
            //     path: '',
            //     component: GeneralDataComponent,
            //     data: {
            //         title: 'General Data'
            //     }
            // },
            // {
            //     path: 'GeneralData',
            //     component: GeneralDataComponent,
            //     data: {
            //         title: 'General Data'
            //     }
            // },
            // {
            //     path: 'OfficeMember',
            //     component: OfficeMemberComponent,
            //     data: {
            //         title: 'Office Member'
            //     }
            // },
            // {
            //     path: 'ProductComponent',
            //     component: ProductComponentComponent,
            //     data: {
            //         title: 'Product Component'
            //     }
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) 

export class ProdOfferingAddDetailRoutingModule { }