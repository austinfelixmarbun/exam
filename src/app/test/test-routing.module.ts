import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Template1Component } from "./template/template1/template1.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'template1',
          component: Template1Component,
          data: {
            title: 'template 1'
          }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }
