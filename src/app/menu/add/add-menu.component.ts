import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { RefFormObj } from 'app/shared/model/RefFormObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'add-menu',
    templateUrl: './add-menu.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})

export class AddMenuSettingComponent implements OnInit {
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
    foundationUrl: string = environment.foundationUrl;
    urlQryPaging: string = AdInsConstant.GetRefFormPaging;
    urlEnviPaging : string = environment.foundationUrl;
    editUrl: any;
    result: any;
    hierarchyNo: any;
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refFormId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormByRefFormId;
            var refFormObj = new RefFormObj();
            refFormObj.refFormId = this.param;
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
        this.parentId = data.parentId;
        if (this.parentId != null) {
            var formParent = new RefFormObj();
            formParent.refFormId = this.parentId;
            this.http.post(this.apiUrl, formParent).subscribe(
                (response) => {
                    this.parentTitle = response['returnObject'].title;
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
        refForm.formCode = form.value.formCode;
        refForm.title = form.value.title;
        refForm.path = form.value.path;
        refForm.icon = form.value.icon;
        if (this.hasSub === true) {
            refForm.class = "has-sub";
        }
        else {
            refForm.class = "";
        }
        refForm.badgeClass = form.value.badgeClass;
        refForm.parentId = lookupZipcode.idSelect;
        refForm.orderNo = form.value.orderNo;
        if (this.isHidden === true) {
            refForm.isHidden = "1";
        }
        else {
            refForm.isHidden = "0";
        }
        refForm.isExternalLink = this.isExternalLink;
        if (this.mode === "edit") {
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefForm;
            refForm.hierarchyNo = this.hierarchyNo;
            refForm.refFormId = this.param;
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
            refForm.hierarchyNo = "0";
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