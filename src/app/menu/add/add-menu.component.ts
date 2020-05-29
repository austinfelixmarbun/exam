import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefFormObj } from 'app/shared/model/RefFormObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';


@Component({
    selector: 'add-menu',
    templateUrl: './add-menu.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})

export class AddMenuSettingComponent implements OnInit {
    inputLookupObj: any;
    parentId: any;
    parentTitle: any;
    formCode: any;
    title: any;
    isExternalLink; any = false;
    hasSub: any = false;
    path: any;
    icon: any;
    badgeClass: any;
    isHidden: any = false;
    orderNo: any;
    param: string;
    mode: string = "add";
    apiUrl: any;
    foundationUrl: string = environment.FoundationR3Url;
    editUrl: any;
    result: any;
    hierarchyNo: any;
    module : any;
    moduleList : any; 
    additionalCriteria: any[];

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refFormId"];
            this.mode = params["mode"];
        });

        //** app-lookupgeneric **//
        this.inputLookupObj = new InputLookupObj();
        this.inputLookupObj.urlJson = "./assets/lookup/lookupMenu.json";
        this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefFormPaging;
        this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
        this.inputLookupObj.pagingJson = "./assets/form-setting/lookupMenuPaging.json";
        this.inputLookupObj.genericJson = "./assets/form-setting/lookupMenuPaging.json";
        //** app-lookupgeneric **//

        /* #region Additional Criteria */
        this.additionalCriteria = new Array();
        var critOrgId = new CriteriaObj();
        critOrgId.propName = "class";
        critOrgId.value = "has-sub";
        critOrgId.restriction = AdInsConstant.RestrictionEq;
        this.additionalCriteria.push(critOrgId);
        this.inputLookupObj.addCritInput = this.additionalCriteria;
        /* #endregion */
    }

    ngOnInit() {
        
        var moduleApi = this.foundationUrl + AdInsConstant.GetListRefModuleKeyValue;
        var refFormObj = new RefFormObj();
        this.http.post(moduleApi, refFormObj).subscribe(
            (response) => {
                this.moduleList = response['returnObject'];
                this.module = this.moduleList[0].key;
            }
        )
        if (this.mode == "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormByRefFormId;
            var refFormObj = new RefFormObj();
            refFormObj.RefFormId = this.param;
            this.http.post(this.apiUrl, refFormObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.result = response['returnObject'];
                    this.setData(this.result);
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );
        }
    }

    setData(data) {
        this.formCode = data.formCode;
        this.title = data.title;
        this.path = data.path;
        this.icon = data.icon;
        if (data.class == "has-sub") {
            this.hasSub = true;
        }
        this.badgeClass = data.badgeClass;
        this.inputLookupObj.idSelect = data.parentId;
        if (this.inputLookupObj.idSelect != null) {
            var formParent = new RefFormObj();
            formParent.RefFormId = this.inputLookupObj.idSelect;
            this.http.post(this.apiUrl, formParent).subscribe(
                (response) => {
                    this.inputLookupObj.nameSelect = response['returnObject'].title;
                })
        }
        this.orderNo = data.orderNo;
        this.hierarchyNo = data.hierarchyNo;
        if (data.isHidden == "1") {
            this.isHidden = true;
        }
        else {
            this.isHidden = false;
        }
        this.isExternalLink = data.isExternalLink;
        this.module = data.refModuleId;
    }

    onChange(event, field) {
        if (field == "Sub") {
            this.hasSub = event.target.checked;
            this.path = "";
        } else if (field == "ext") {
            this.isExternalLink = event.target.checked;
        } else if (field == "hidden") {
            this.isHidden = event.target.checked;
        }
    }

    Save(form, lookupZipcode) {
        var refForm = new RefFormObj();
        refForm.FormCode = form.value.formCode;
        refForm.Title = form.value.title;
        refForm.Path = form.value.path;
        refForm.Icon = form.value.icon;
        refForm.RefModuleId = this.module;
        if (this.hasSub == true) {
            refForm.Class = "has-sub";
        }
        else {
            refForm.Class = "";
        }
        refForm.BadgeClass = form.value.badgeClass;
        refForm.ParentId = lookupZipcode.lookupInput.idSelect;
        refForm.OrderNo = form.value.orderNo;
        if (this.isHidden == true) {
            refForm.IsHidden = "1";
        }
        else {
            refForm.IsHidden = "0";
        }
        refForm.IsExternalLink = this.isExternalLink;
        if (this.mode == "edit") {
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefForm;
            refForm.HierarchyNo = this.hierarchyNo;
            refForm.RefFormId = this.param;
            this.http.post(this.editUrl, refForm).subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/menuSetting');
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.foundationUrl + AdInsConstant.AddRefForm;
            refForm.HierarchyNo = "0";
            this.http.post(this.editUrl, refForm).subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/menuSetting');
                },
                (error) => {
                    console.log(error);
                });
        }

    }
}