import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Dummy1Component } from "./dummy1/dummy1.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'dummy1',
          component: Dummy1Component,
          data: {
            title: 'Dummy 1'
          }
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestNewRoutingModule { }
