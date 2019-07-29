import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DummyComponent } from "./dummy/dummy.component";
import { DummyAddComponent } from "./dummy/dummy-add/dummy-add.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";
import { DummyPagingComponent } from "./dummy/dummy-paging/dummy-paging.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'dummy',
          component: DummyComponent,
          data: {
            title: 'Dummy'
          }
        },
        {
          path: 'dummy/add',
          component: DummyAddComponent,
          data: {
            title: 'Dummy'
          }
        },
        {
          path: 'dummy2',
          component: Dummy2Component,
          data: {
            title: 'Dummy2'
          }
        },
        {
          path: 'dummy3',
          component: Dummy3Component,
          data: {
            title: 'Dummy3'
          }
        },
        {
          path: 'dummyPaging',
          component: DummyPagingComponent,
          data: {
            title: 'Dummy3'
          }
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }
