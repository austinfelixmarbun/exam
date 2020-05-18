import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefFormObj } from 'app/shared/model/RefFormObj.Model';

@Component({
  selector: 'app-ref-form-detail',
  templateUrl: './ref-form-detail.component.html',
  styleUrls: ['./ref-form-detail.component.scss'],
  providers: [NGXToastrService]
})
export class RefFormDetailComponent implements OnInit {
  itemModuleType: any;
  itemClassType: any;
  inputLookupParentObj: any;
  mode: string = "add";
  refFormObj: RefFormObj = new RefFormObj;
  resultRefForm: any;
  RefFormId: number;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefFormId = params['RefFormId'];
      this.mode = params['mode'];
    });
  }

  RefForm = this.fb.group({
    RefModuleId: [''],
    Class: [''],
    FormCode: ['', Validators.required],
    Title: ['', Validators.required],
    Path: ['', Validators.required],
    Icon: [''],
    OrderNo: ['', Validators.pattern("^[0-9]+$")],
    HierarchyNo: ['', Validators.pattern("^[0-9]+$")],
    IsHidden: false,
    IsExternalLink: false
  });

  ngOnInit() {
    var refMasterModuleObj = {
    }

    this.http.post(AdInsConstant.GetListRefModuleKeyValue, refMasterModuleObj).subscribe(
      (response) => {
        this.itemModuleType = response["ReturnObject"];
        if (this.mode == "add") {
          this.RefForm.patchValue({
            RefModuleId: this.itemModuleType[0].Key
          });
        }
      }
    );

    var refMasterClassObj = {
      RefMasterTypeCode: "FORM_CLASS",
    }

    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterClassObj).subscribe(
      (response) => {
        this.itemClassType = response["ReturnObject"];
        if (this.mode == "add") {
          this.RefForm.patchValue({
            Class: this.itemClassType[0].Key
          });
        }
      }
    );

    if (this.mode == "edit") {
      var refFormObj = {
        RefFormId: this.RefFormId
      }
      this.http.post<RefFormObj>(AdInsConstant.GetRefFormDataByRefFormId, refFormObj).subscribe(
        (response) => {
          this.resultRefForm = response;
          this.refFormObj = response;
          this.refFormObj.RefFormId = this.RefFormId;
          this.refFormObj.RowVersion = this.refFormObj.RowVersion;
          this.RefForm.patchValue({
            RefModuleId: this.refFormObj.RefModuleId,
            Class: this.refFormObj.Class,
            FormCode: this.refFormObj.FormCode,
            Title: this.refFormObj.Title,
            Path: this.refFormObj.Path,
            Icon: this.refFormObj.Icon,
            OrderNo: this.refFormObj.OrderNo,
            HierarchyNo: this.refFormObj.HierarchyNo,
            IsHidden: this.refFormObj.IsHidden,
            IsExternalLink: this.refFormObj.IsExternalLink
          });
          this.RefForm.controls.FormCode.disable();
          this.setLookup();

          if(this.refFormObj.Class=="has-sub"){
            this.RefForm.patchValue({
              Class: "HAS_SUB"
            })
          }else{
            this.RefForm.patchValue({
              Class: "NO_SUB"
            })
          }
        }
      );
    } else {
      this.mode = "add";
      this.setLookup();
    }
  }

  setLookup() {
    this.inputLookupParentObj = new InputLookupObj();
    this.inputLookupParentObj.urlJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.isRequired = false;

    if (this.resultRefForm != null) {
      this.inputLookupParentObj.jsonSelect = { Title: this.resultRefForm.ParentTitle }
    }
  }

  getLookupParent(ev) {
    this.refFormObj.ParentId = ev.RefFormId;
  }

  SaveForm() {
    this.refFormObj.RefModuleId = this.RefForm.controls.RefModuleId.value;
    this.refFormObj.Class = this.RefForm.controls.Class.value;
    this.refFormObj.FormCode = this.RefForm.controls.FormCode.value;
    this.refFormObj.Title = this.RefForm.controls.Title.value;
    this.refFormObj.Path = this.RefForm.controls.Path.value;
    this.refFormObj.Icon = this.RefForm.controls.Icon.value;
    this.refFormObj.OrderNo = this.RefForm.controls.OrderNo.value;
    this.refFormObj.HierarchyNo = this.RefForm.controls.HierarchyNo.value;
    this.refFormObj.IsHidden = this.RefForm.controls.IsHidden.value;
    this.refFormObj.IsExternalLink = this.RefForm.controls.IsExternalLink.value;

    if (this.mode == "edit") {
      this.http.post(AdInsConstant.EditRefFormData, this.refFormObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/SystemSetting/RefForm/Paging');
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.http.post(AdInsConstant.AddRefFormData, this.refFormObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/SystemSetting/RefForm/Paging']);
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
