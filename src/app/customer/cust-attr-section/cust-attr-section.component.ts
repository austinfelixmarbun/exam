import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cust-attr-section',
  templateUrl: './cust-attr-section.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class CustAttrSectionComponent implements OnInit {
  @Input() CustId: number;
  @Output() outputTab: EventEmitter<Object> = new EventEmitter<Object>();
  pageType: string;
  listCustAttrContent: Array<Object>;
  isCustAttrReady: boolean;

  CustAttrContentForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { 
    this.pageType = "add";
    this.listCustAttrContent = new Array<Object>();
    this.isCustAttrReady = false;
  }

  ngOnInit() {
    this.httpClient.post(URLConstant.GetListCustAttrContentByCustIdForCust, { CustId: this.CustId }).pipe(first()).subscribe(
      (response) => {
        var parentFormGroup = new Object();
        this.listCustAttrContent = response["NewCustAttrContentObjs"];
        if(this.listCustAttrContent[0]["CustAttrContentId"] > 0){
          this.pageType = "edit";
        }
        for (const custAttr of this.listCustAttrContent) {
          var formGroupObject = new Object();
          formGroupObject["CustAttrContentId"] = [custAttr["CustAttrContentId"], [Validators.required]];
          formGroupObject["RefAttrId"] = [custAttr["RefAttrId"], [Validators.required]];
          formGroupObject["AttrValue"] = [custAttr["AttrValue"], [Validators.required]];
          parentFormGroup[custAttr["AttrCode"]] = this.fb.group(formGroupObject);
        }
        this.CustAttrContentForm = this.fb.group(parentFormGroup);
        this.isCustAttrReady = true;
        // console.log("CustAttrContentForm: " + JSON.stringify(this.CustAttrContentForm.controls[this.listCustAttrContent[0]["AttrCode"]].value));
        // console.log("listCustAttrContent: " + JSON.stringify(this.listCustAttrContent));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SplitAttrListValue(value){
    return value.split(";");
  }

  SaveForm(){
    var formValue = this.CustAttrContentForm.value;
    var custAttrRequest = new Array<Object>();
    var url = this.pageType == "add" ? URLConstant.AddListCustAttrContent : URLConstant.EditListCustAttrContent;
    if(Object.keys(formValue).length > 0 && formValue.constructor === Object){
      for (const key in formValue) {
        var custAttr = {
          CustAttrContentId: formValue[key]["CustAttrContentId"],
          CustId: this.CustId,
          RefAttrId: formValue[key]["RefAttrId"],
          AttrValue: formValue[key]["AttrValue"]
        };
        custAttrRequest.push(custAttr);
      }
      this.httpClient.post(url, custAttrRequest).pipe(first()).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputTab.emit({ stepMode: "next"});
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.toastr.errorMessage("No Attribute To Save");
    }
  }
}
