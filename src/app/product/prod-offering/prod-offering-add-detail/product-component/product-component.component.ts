import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  providers: [NGXToastrService]
})
export class ProductComponentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService
  ) { }


  RefSchemeForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      ProdOfferingDId: [''],
      ProdOfferingHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefApprovalForm = this.fb.group({
    items1: this.fb.array([this.fb.group({
      ProdOfferingDId: [''],
      ProdOfferingHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefRuleForm = this.fb.group({
    items2: this.fb.array([this.fb.group({
      ProdOfferingDId: [''],
      ProdOfferingHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefOtherForm = this.fb.group({
    items3: this.fb.array([this.fb.group({
      ProdOfferingDId: [''],
      ProdOfferingHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  inputLookUpObj;
  UrlBackEnd;

  lookupEnvironment;

  listRefProductDetailObj;
  refProductDetailObj;
  items;
  items1;
  items2;
  items3;

  ngOnInit() {

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";

    // Get Data Input
    this.UrlBackEnd = AdInsConstant.GetProductOfferingComponent;
    // var ProdOfferingComponent = {
    //   GroupCodes: [
    //     "SCHM",
    //     "LOS",
    //     "RULE",
    //     "OTHR"
    //   ],
    //   RowVersion: ""
    // }

    var ProdOfferingComponentScheme = {
      GroupCodes: [
        "SCHM"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentApproval = {
      GroupCodes: [
        "LOS"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentRule = {
      GroupCodes: [
        "RULE"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentOther = {
      GroupCodes: [
        "OTHR"
      ],
      RowVersion: ""
    }

    this.items = this.RefSchemeForm.get('items') as FormArray;
    this.http.post(this.UrlBackEnd, ProdOfferingComponentScheme).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj = response["ReturnObject"].length;

        if (lengthDataReturnObj) {
          for (var i = 0; i < lengthDataReturnObj; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOFferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            this.resolveDDL(eachDataDetail, i);
            // Push Data
            this.items.push(eachDataDetail);
          }
        }
        this.items.removeAt(0);
        console.log("cek form");
        console.log(this.RefSchemeForm);
      },
      (error) => {
        console.log(error);
      }
    );
    this.items1 = this.RefApprovalForm.get('items1') as FormArray;
    this.http.post(this.UrlBackEnd, ProdOfferingComponentApproval).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj1 = response["ReturnObject"].length;

        if (lengthDataReturnObj1) {
          for (var i = 0; i < lengthDataReturnObj1; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOFferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            this.resolveDDL(eachDataDetail, i);
            // Push Data
            this.items1.push(eachDataDetail);
          }
        }
        this.items1.removeAt(0);
        console.log("cek form");
        console.log(this.RefApprovalForm);
      },
      (error) => {
        console.log(error);
      }
    );
    this.items2 = this.RefRuleForm.get('items2') as FormArray;
    this.http.post(this.UrlBackEnd, ProdOfferingComponentRule).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj2 = response["ReturnObject"].length;

        if (lengthDataReturnObj2) {
          for (var i = 0; i < lengthDataReturnObj2; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOFferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            this.resolveDDL(eachDataDetail, i);
            // Push Data
            this.items2.push(eachDataDetail);
          }
        }
        this.items2.removeAt(0);
        console.log("cek form");
        console.log(this.RefRuleForm);
      },
      (error) => {
        console.log(error);
      }
    );
    this.items3= this.RefOtherForm.get('items3') as FormArray;
    this.http.post(this.UrlBackEnd, ProdOfferingComponentOther).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj3 = response["ReturnObject"].length;

        if (lengthDataReturnObj3) {
          for (var i = 0; i < lengthDataReturnObj3; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOFferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            this.resolveDDL(eachDataDetail, i);
            // Push Data
            this.items3.push(eachDataDetail);
          }
        }
        this.items3.removeAt(0);
        console.log("cek form");
        console.log(this.RefOtherForm);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resolveDDL(obj: any, indexAt: any) {
    console.log("Cek Obj DDL:");
    // console.log(indexAt);

    var urlGet = obj.controls.ProdCompntDtaSrcApi.value;
    var masterTypeCodeAPI = obj.controls.ProdCompntDtaSrc.value;
    var masterTypeCode = obj.controls.ProdCompntDtaSrc.value;
    var ddlArray = this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownList as FormArray;
    var ddlObj: any;
    var eachDDLDetail: any;
    var lengthDDL: any;
    if (urlGet) {
      // console.log("cek API " + (indexAt + 1));

      // Make different obj passing
      switch (masterTypeCodeAPI) {
        case "REF_MASTER":
          ddlObj = {
            RefMasterTypeCode: masterTypeCode,
            RowVersion: ""
          };
          this.http.post(urlGet, ddlObj).subscribe(
            (response) => {
              // console.log(response);
              lengthDDL = response["ReturnObject"].length;
              if (lengthDDL > 0) {
                for (var i = 0; i < lengthDDL; i++) {
                  eachDDLDetail = this.fb.group({
                    key: response["ReturnObject"][i].MasterCode,
                    value: response["ReturnObject"][i].Descr,
                  }) as FormGroup;
                  // console.log(eachDDLDetail);
                  ddlArray.push(eachDDLDetail);
                }
                ddlArray.removeAt(0);
              }
              // console.log(ddlArray);
            },
            (error) => {
              console.log(error);
            }
          );
          break;
        case "REF_LOB":
          ddlObj = {
            RowVersion: ""
          };
          this.http.post(urlGet, ddlObj).subscribe(
            (response) => {
              // console.log(response);
              lengthDDL = response["ReturnObject"].length;
              if (lengthDDL > 0) {
                for (var i = 0; i < lengthDDL; i++) {
                  eachDDLDetail = this.fb.group({
                    key: response["ReturnObject"][i].LobCode,
                    value: response["ReturnObject"][i].LobName,
                  }) as FormGroup;
                  // console.log(eachDDLDetail);
                  ddlArray.push(eachDDLDetail);
                }
                ddlArray.removeAt(0);
              }
              // console.log(ddlArray);
            },
            (error) => {
              console.log(error);
            }
          );
          break;
        case "ASSET_TYPE":
          ddlObj = {
            RowVersion: ""
          };
          this.http.post(urlGet, ddlObj).subscribe(
            (response) => {
              // console.log(response);
              lengthDDL = response["ReturnObject"].length;
              if (lengthDDL > 0) {
                for (var i = 0; i < lengthDDL; i++) {
                  eachDDLDetail = this.fb.group({
                    key: response["ReturnObject"][i].AssetTypeCode,
                    value: response["ReturnObject"][i].AssetTypeName,
                  }) as FormGroup;
                  // console.log(eachDDLDetail);
                  ddlArray.push(eachDDLDetail);
                }
                ddlArray.removeAt(0);
              }
              // console.log(ddlArray);
            },
            (error) => {
              console.log(error);
            }
          );
          break;
          case "REF_CURR":
            ddlObj = {
              RowVersion: ""
            };
            this.http.post(urlGet, ddlObj).subscribe(
              (response) => {
                // console.log(response);
                lengthDDL = response["ReturnObject"].length;
                if (lengthDDL > 0) {
                  for (var i = 0; i < lengthDDL; i++) {
                    eachDDLDetail = this.fb.group({
                      key: response["ReturnObject"][i].CurrCode,
                      value: response["ReturnObject"][i].CurrName,
                    }) as FormGroup;
                    // console.log(eachDDLDetail);
                    ddlArray.push(eachDDLDetail);
                  }
                  ddlArray.removeAt(0);
                }
                // console.log(ddlArray);
              },
              (error) => {
                console.log(error);
              }
            );
            break;
      }

      // Get Drop Down List
      
    }
  }

 }
