import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location, DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ref-attr-detail',
  templateUrl: './ref-attr-detail.component.html',
  styles: []
})
export class RefAttrDetailComponent implements OnInit {
  pageType: string;
  refAttrId: number;
  attrInputTypeList: Array<Object>;
  attrTypeCodeList: Array<Object>;

  RefAttrForm = this.fb.group({
    RefAttrId: [0, [Validators.required]],
    AttrCode: ['', [Validators.required]],
    AttrName: ['', [Validators.required]],
    AttrLength: ['', [Validators.required]],
    AttrTypeCode: ['', [Validators.required]],
    AttrInputType: ['', [Validators.required]],
    AttrGroup: ['', [Validators.required]],
    PatternCode: [''],
    PatternValue: [''],
    IsSystem: [false],
    IsActive: [true],
    RsvField1: [''],
    RsvField2: [''],
    RsvField3: [''],
    RsvField4: [''],
    RsvField5: [''],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.pageType = params['mode'];
      }
      else{
        this.pageType = "add";
      }
      
      if (params['refAttrId'] != null) {
        this.refAttrId = params['refAttrId'];
      }
    });

    this.attrInputTypeList = new Array<Object>();
    this.attrInputTypeList.push(
      {
        Key: "T",
        Value: "Text"
      },
      {
        Key: "N",
        Value: "Numeric"
      },
      {
        Key: "L",
        Value: "List"
      },
      {
        Key: "P",
        Value: "Textarea"
      },
      {
        Key: "D",
        Value: "Date"
      },
      {
        Key: "A",
        Value: "Amount"
      }
    );
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    let getAttrType = this.httpClient.post(URLConstant.GetListActiveRefAttrType, new Object()).pipe(first());
    if(this.pageType == "edit"){
      let getRefAttr = this.httpClient.post(URLConstant.GetRefAttrById, { RefAttrId: this.refAttrId }).pipe(first());
      forkJoin([getRefAttr, getAttrType]).subscribe(
        (response) => {
          var refAttr = response[0];
          var attrTypeList = response[1];
          this.attrTypeCodeList = [...attrTypeList["ReturnObject"]];
          console.log("TypeCodeList: " + JSON.stringify(this.attrTypeCodeList));
          this.RefAttrForm.patchValue({...refAttr});

          switch (refAttr["AttrInputType"]) {
            case 'T':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required]));
              break;
            
            case 'N':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required, Validators.pattern('^[0-9]+$')]));
              break;

            case 'L':
              var valueList = refAttr["AttrValue"].split(";");
              console.log("ValueList: " + JSON.stringify(valueList));
              var formArray = this.fb.array([]);
              for (const item of valueList) {
                formArray.push(this.fb.control(item, [Validators.required]));
              }
              this.RefAttrForm.addControl("AttrValue", formArray);
              break;

            case 'P':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required]));
              break;

            case 'D':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(datePipe.transform(refAttr["AttrValue"], "yyyy-MM-dd"), [Validators.required]));
              break;

            case 'A':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required]));
              break;
          
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      getAttrType.subscribe(
        (response) => {
          this.attrTypeCodeList = [...response["ReturnObject"]];
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  AttrInputTypeHandler(){
    var type = this.RefAttrForm.controls["AttrInputType"].value;

    if(this.RefAttrForm.contains("AttrValue")){
      this.RefAttrForm.removeControl("AttrValue");
    }

    switch (type) {
      case 'T':
        this.RefAttrForm.addControl("AttrValue", this.fb.control('', [Validators.required]));
        break;
      
      case 'N':
        this.RefAttrForm.addControl("AttrValue", this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]));
        break;

      case 'L':
        this.RefAttrForm.addControl("AttrValue", this.fb.array([]));
        break;

      case 'P':
        this.RefAttrForm.addControl("AttrValue", this.fb.control('', [Validators.required]));
        break;

      case 'D':
        this.RefAttrForm.addControl("AttrValue", this.fb.control('', [Validators.required]));
        break;

      case 'A':
        this.RefAttrForm.addControl("AttrValue", this.fb.control('', [Validators.required]));
        break;

      default:
        break;
    }
  }

  AttrValueRowHandler(){
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.push(this.fb.control('', [Validators.required]));
  }

  RemoveAttrValueRow(idx){
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.removeAt(idx);
  }

  Back() {
    this.location.back();
  }

  Save(enjiForm){
    var formValue = this.RefAttrForm.value;
    var url = this.pageType == "add" ? URLConstant.AddRefAttr : URLConstant.EditRefAttr;

    if(formValue["AttrInputType"] == "L"){
      var attrValue = "";
      for (let index = 0; index < formValue["AttrValue"].length; index++) {
        if(index < formValue["AttrValue"].length - 1){
          attrValue += formValue["AttrValue"][index] + ";";
        }
        else{
          attrValue += formValue["AttrValue"][index];
        }
      }
      formValue["AttrValue"] = attrValue;
    }

    this.httpClient.post(url, formValue).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Asset/RefAttr/Paging"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
