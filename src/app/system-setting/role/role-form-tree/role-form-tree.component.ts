import { RefFormObj } from "app/shared/model/RefFormObj.Model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import {
  SelectableSettings,
  CheckedState
} from "@progress/kendo-angular-treeview";
import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ActivatedRoute } from "@angular/router";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { Location, DecimalPipe } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { UcgridfooterComponent } from "@adins/ucgridfooter";
import { UCSearchComponent } from "@adins/ucsearch";
import { elementStylingMap } from "@angular/core/src/render3";

@Component({
  selector: "app-role-form-tree",
  templateUrl: "./role-form-tree.component.html",
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class RoleFormTreeComponent implements OnInit {
  resultData: any;
  apiUrl: any;
  deleteUrl: any;
  authFormObj: AuthFormObj = new AuthFormObj();
  foundationUrl: string = environment.foundationUrl;
  refRoleId: any;
  refFormId: any;
  roleName: any;
  formName: any;
  check: any;
  menu: any;
  formFeature: any;
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  listFeature: any[] = [];

  expandedKeys: any[] = ["0", "1"];
  selectedKeys: any[] = [];
  selection: SelectableSettings = { mode: "multiple" };
  hasChildren = (item: any) => item.items && item.items.length > 0;
  fetchChildren = (item: any) => of(item.items);
  key = "refFormId";

  form: FormGroup;
  data = [];

  constructor(
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["refRoleId"] != null) {
        this.refRoleId = params["refRoleId"];
        console.log("RefRoleId", this.refRoleId);
      }
    });

    this.form = this.formBuilder.group({
      data: []
    });
  }

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm() {
    this.listFeature = [];
    var temp: any;
    var refFormObj: RefFormObj = new RefFormObj();
    var urlGetFeature: any =
      this.foundationUrl + AdInsConstant.GetAllActiveRefForm;
    this.httpClient.post(urlGetFeature, refFormObj).subscribe(response => {
      this.resultData = response;
      this.listFeature = response["returnObject"];

      response["returnObject"].forEach(x => {
        if (x.submenu.length > 0)
        {
          x.submenu.forEach(y => {
            temp = {title: y.title, refFormId: y.refFormId, parentId: y.parentId};
            this.listFeature.push(temp);
            if (y.submenu.length > 0)
            {
              y.submenu.forEach(z => {
                temp = {title: z.title, refFormId: z.refFormId, parentId: z.parentId};
                this.listFeature.push(temp);
              });
            }
          });
        }

      });
      // console.log(this.listFeature);
    });
  }

  isChecked = (dataItem: any, index: string): CheckedState => {
    if (this.containsItem(dataItem)) {
      return "checked";
    }

    if (this.isIndeterminate(dataItem.items)) {
      return "indeterminate";
    }

    return "none";
  };

  containsItem(item: any): boolean {
    return this.selectedKeys.indexOf(item[this.key]) > -1;
  }

  isIndeterminate(items: any[] = []): boolean {
    let idx = 0;
    let item;

    while ((item = items[idx])) {
      if (this.isIndeterminate(item.items) || this.containsItem(item)) {
        return true;
      }

      idx += 1;
    }

    return false;
  }
}
