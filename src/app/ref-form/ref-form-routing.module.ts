import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RefFormPagingComponent } from "./ref-form-paging/ref-form-paging.component";
import { RefFormDetailComponent } from "./ref-form-detail/ref-form-detail.component";
import { RefFormRoleMappingComponent } from "./ref-form-role-mapping/ref-form-role-mapping.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Paging',
        component: RefFormPagingComponent,
        data: {
          title: 'Ref Form Paging'
        },
      },
      {
        path: 'Detail',
        component: RefFormDetailComponent,
        data: {
          title: 'Ref Form Detail'
        },
      },
      {
        path: 'RoleMapping',
        component: RefFormRoleMappingComponent,
        data: {
          title: 'Ref Form Role Mapping'
        },
      },
  ]
}
]

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class RefFormRoutingModule { }
