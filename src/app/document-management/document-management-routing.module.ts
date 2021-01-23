import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CabinetPagingComponent } from "./cabinet/cabinet-paging/cabinet-paging.component";
import { CabinetAddEditComponent } from "./cabinet/cabinet-add-edit/cabinet-add-edit.component";
import { RackPagingComponent } from "./rack/rack-paging/rack-paging.component";
import { RackAddEditComponent } from "./rack/rack-add-edit/rack-add-edit.component";
import { FilingPagingComponent } from "./filing/filing-paging/filing-paging.component";
import { FilingAddEditComponent } from "./filing/filing-add-edit/filing-add-edit.component";
import { ViewCabinetComponent } from "./view/cabinet/view-cabinet.component";
import { ViewRackComponent } from "./view/rack/view-rack.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Cabinet/Paging',
                component: CabinetPagingComponent,
                data: {
                    title: 'CABINET'
                }
            },
            {
                path: 'Cabinet/AddEdit',
                component: CabinetAddEditComponent,
                data: {
                    title: 'CABINET'
                }
            },
            {
                path: 'Rack/Paging',
                component: RackPagingComponent,
                data: {
                    title: 'RACK'
                }
            },
            {
                path: 'Rack/AddEdit',
                component: RackAddEditComponent,
                data: {
                    title: 'RACK'
                }
            },
            {
                path: 'Filing/Paging',
                component: FilingPagingComponent,
                data: {
                    title: 'FILING'
                }
            },
            {
                path: 'Filing/AddEdit',
                component: FilingAddEditComponent,
                data: {
                    title: 'FILING'
                }
            },
            {
                path: 'ViewCabinet',
                component: ViewCabinetComponent,
                data: {
                    title: 'View Cabinet'
                }
            },
            {
                path: 'ViewRack',
                component: ViewRackComponent,
                data: {
                    title: 'View Rack'
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DocumentManagementRoutingModule{}