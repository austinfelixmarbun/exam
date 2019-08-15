import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DummyComponent } from "./dummy/dummy.component";
import { DummyAddComponent } from "./dummy/dummy-add/dummy-add.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";
import { DummyPagingComponent } from "./dummy/dummy-paging/dummy-paging.component";
import { Template1Component } from "./template/template1/template1.component";
import { TestPagingComponent } from "./test-paging/test-paging.component";
import { TestPagingV2Component } from "./test-paging-v2/test-paging-v2.component";
import { TestPagingV3Component } from "./test-paging-v3/test-paging-v3.component";
import { TEST_ROUTES } from "app/shared/routes/test-layout.routes";

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
            title: 'Dummy 2'
          }
        },
        {
          path: 'dummy3',
          component: Dummy3Component,
          data: {
            title: 'Dummy 3'
          }
        },
        {
          path: 'dummyPaging',
          component: DummyPagingComponent,
          data: {
            title: 'Dummy Paging'
          }
        },
        {
          path: 'template1',
          component: Template1Component,
          data: {
            title: 'template 1'
          }
        },
        {
          path: 'paging',
          component: TestPagingComponent,
          data: {
            title: 'test Paging'
          }
        },
        {
          path: 'paging-v2',
          component: TestPagingV2Component,
          data: {
            title: 'test v2 Paging'
          }
        },
        {
          path: 'paging-v3',
          component: TestPagingV3Component,
          data: {
            title: 'test v3 Paging'
          },
          children: TEST_ROUTES
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }
