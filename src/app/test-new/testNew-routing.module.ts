import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";

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
      {
        path: 'dummy2',
        component: Dummy2Component,
        data: {
          title: 'Dummy 2'
        }
      },
      {
        path: 'dummy3',
        component: Dummy3Component,
        data: {
          title: 'Dummy 3'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestNewRoutingModule { }
