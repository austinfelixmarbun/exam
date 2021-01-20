import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefFormObj } from 'app/shared/model/RefFormObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ParameterObj } from 'app/shared/model/ParameterObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';

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
  checkClass: boolean = false;
  parameterObj : Array<ParameterObj> = new Array<ParameterObj>();

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
    OrderNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    HierarchyNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    IsHidden: false,
    IsExternalLink: false,
    RowVersion: ['']
  });
  ParamForm = this.fb.group({
    ParameterValue : [''],
    ParameterAttribute : ['']
  });
  ngOnInit() {
    
    var refMasterModuleObj = {
    }

    this.http.post(URLConstant.GetListRefModuleKeyValue, refMasterModuleObj).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.itemModuleType = response[CommonConstant.ReturnObj];
          if (this.mode == "add") {
            this.RefForm.patchValue({
              RefModuleId: this.itemModuleType[0].Key
            });
          }
        }
      }
    );

    var refMasterClassObj = {
      RefMasterTypeCode: "FORM_CLASS",
    }

    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterClassObj).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.itemClassType = response[CommonConstant.ReturnObj];
          if (this.mode == "add") {
            this.RefForm.patchValue({
              Class: this.itemClassType[0].Key
            });
          }
        }
        this.CheckClass();
      }
    );

    if (this.mode == "edit") {
      var refFormObj = {
        RefFormId: this.RefFormId
      }
      this.http.post<RefFormObj>(URLConstant.GetRefFormDataByRefFormId, refFormObj).subscribe(
        (response) => {
          this.resultRefForm = response;
          this.refFormObj = response;
          this.refFormObj.RefFormId = this.RefFormId;
          this.parameterObj = this.resultRefForm.ParameterList;
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
            IsExternalLink: this.refFormObj.IsExternalLink,
            RowVersion: this.refFormObj.RowVersion,
          });
          this.RefForm.controls.FormCode.disable();
          this.setLookup();
          this.CheckClass();
        }
      );
    } else {
      this.mode = "add";
      this.setLookup();
    }
  }

  AddParam(){
    if( this.ParamForm.controls.ParameterAttribute.value == "" || this.ParamForm.controls.ParameterValue.value == ""){
      this.toastr.errorMessage("Parameter Attribute and Parameter Value cannot be empty.")
      return;
    }
    var paramObj = new ParameterObj();
    paramObj.Attr = this.ParamForm.controls.ParameterAttribute.value;
    paramObj.Value = this.ParamForm.controls.ParameterValue.value;
    this.parameterObj.push(paramObj);
    this.ParamForm.reset();
    
  }

  CheckClass() {
    if (this.RefForm.controls.Class.value == "has-sub") {
      this.RefForm.patchValue({
        Path: ""
      });
      this.RefForm.controls.Path.clearValidators();
      this.RefForm.controls.Path.disable();
      this.checkClass = false;
    } else {
      this.RefForm.controls.Path.setValidators(Validators.required);
      this.RefForm.controls.Path.enable();
      this.checkClass = true;
    }
    this.RefForm.controls.Path.updateValueAndValidity();
  }

  setLookup() {
    this.inputLookupParentObj = new InputLookupObj();
    this.inputLookupParentObj.urlJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
    this.inputLookupParentObj.isRequired = false;
    this.inputLookupParentObj.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "CLASS";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "has-sub";
    this.inputLookupParentObj.addCritInput.push(critInput);

    if (this.resultRefForm != null) {
      this.inputLookupParentObj.jsonSelect = { Title: this.resultRefForm.ParentTitle }
    }
  }

  getLookupParent(ev) {
    this.refFormObj.ParentId = ev.RefFormId;
  }

  DeleteParam(i){
    this.parameterObj.splice(i,1)
  }

  SaveForm() {
    this.refFormObj.RefModuleId = this.RefForm.controls.RefModuleId.value;
    this.refFormObj.Class = this.RefForm.controls.Class.value;
    this.refFormObj.FormCode = this.RefForm.controls.FormCode.value;
    this.refFormObj.Title = this.RefForm.controls.Title.value;
    this.refFormObj.Icon = this.RefForm.controls.Icon.value;
    this.refFormObj.OrderNo = this.RefForm.controls.OrderNo.value;
    this.refFormObj.HierarchyNo = this.RefForm.controls.HierarchyNo.value;
    this.refFormObj.IsHidden = this.RefForm.controls.IsHidden.value;
    this.refFormObj.IsExternalLink = this.RefForm.controls.IsExternalLink.value;
    this.refFormObj.ParameterList = this.parameterObj;
    
    if (this.refFormObj.Class == "has-sub") {
      this.refFormObj.Path = "";
    } else if (this.refFormObj.Class == "no-sub") {
      this.refFormObj.Path = this.RefForm.controls.Path.value;
    }

    if (this.mode == "edit") {
      this.refFormObj.RowVersion = this.RefForm.controls.RowVersion.value;
      this.http.post(URLConstant.EditRefFormData, this.refFormObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,["/SystemSetting/RefForm/Paging"],{});
          
        });
    } else {
      this.http.post(URLConstant.AddRefFormData, this.refFormObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,["/SystemSetting/RefForm/Paging"],{});
        });
    }
  }
}
