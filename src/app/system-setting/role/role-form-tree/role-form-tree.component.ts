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
import { TreeItemLookup } from '@progress/kendo-angular-treeview';
import { RefRoleObj } from "app/shared/model/RefRoleObj.Model";

@Component({
  selector: "app-role-form-tree",
  templateUrl: "./role-form-tree.component.html",
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class RoleFormTreeComponent implements OnInit {
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
  refRoleObj: any;
  listSelectedId: any[] = [];
  listDeletedId: any[] = [];
  listMenu: any[] = [];

  expandedKeys: any[] = ["0", "1"];
  selectedKeys: any[] = [];
  selection: SelectableSettings = { mode: "multiple" };

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
    this.listMenu = [];
    var temp: any;
    var refFormObj: RefFormObj = new RefFormObj();

    //Generate Tree
    var urlGetFeature: any =
      this.foundationUrl + AdInsConstant.GetAllActiveRefForm;
    this.httpClient.post(urlGetFeature, refFormObj).subscribe(response => {
      this.listMenu = response["returnObject"];
      this.menu = response["returnObject"];
      response["returnObject"].forEach(x => {
        if (x.submenu.length > 0)
        {
          x.submenu.forEach(y => {
            temp = {title: y.title, refFormId: y.refFormId, parentId: y.parentId};
            this.listMenu.push(temp);
            if (y.submenu.length > 0)
            {
              y.submenu.forEach(z => {
                temp = {title: z.title, refFormId: z.refFormId, parentId: z.parentId};
                this.listMenu.push(temp);
              });
            }
          });
        }
      });
    });

    ///Get Data Auth Form
    var urlGetRefRole: any =
      this.foundationUrl + AdInsConstant.GetRefRoleByRefRoleId;
    var getAuthFormUrl: any = this.foundationUrl + AdInsConstant.GetAllAuthFormsByRefRoleId;
    this.refRoleObj = new RefRoleObj();
    this.refRoleObj.refRoleId = this.refRoleId;
    console.log(urlGetRefRole);
    this.httpClient.post(urlGetRefRole, this.refRoleObj).subscribe(
      response => {
        this.refRoleObj = response["returnObject"];
        console.log(response["returnObject"]);
        this.spinner.hide();
        this.httpClient.post(getAuthFormUrl, this.refRoleObj).subscribe(
          response => {
            this.listDeletedId = [];
            this.listSelectedId = [];
            response['returnObject'].forEach(element => {
              this.listSelectedId.push(element.refFormId);
              this.listDeletedId.push(element.refFormId);
            });
            console.log('Sel', this.listSelectedId);
            console.log('Del', this.listDeletedId);
          },
          error => {
            console.log(error);
            this.spinner.hide();
          }
        );
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  isChecked = (dataItem: any, index: string): CheckedState => {
    console.log('masuk');
    if (this.containsItem(dataItem)) {
      console.log('checked');
      return "checked";
    }

    if (this.isIndeterminate(dataItem.items)) {
      console.log('indeterminate');
      return "indeterminate";
    }
    console.log('none');
    return "none";
  };

  containsItem(item: any): boolean {
    console.log(this.key);
    return this.listSelectedId.indexOf(item[this.key]) > -1;

  }

  isIndeterminate(items: any[] = []): boolean {
    let idx = 0;
    let item;

    while ((item = items[idx])) {
      if (this.isIndeterminate(item.items) || this.containsItem(item)) {
        console.log(item.items);
        return true;
      }

      idx += 1;
    }

    return false;
  }


  Back(): void {
    this.location.back();
  }

  Save(): void {
    var assignRoleToFormsUrl = this.foundationUrl + AdInsConstant.AssignRoleToForms;
    this.refRoleObj = new RefRoleObj();
    this.refRoleObj.refRoleId = this.refRoleId;
    this.refRoleObj.listAddRefFormId = this.listSelectedId;
    this.refRoleObj.listDelRefFormId = this.listDeletedId;
    console.log(this.refRoleObj);
    this.httpClient.post(assignRoleToFormsUrl, this.refRoleObj).subscribe(
      response => {
        this.service.typeSave(response['message']);
        this.location.back();
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.service.typeErrorCustom(error);
        this.spinner.hide();
      }
    );
  }
}
