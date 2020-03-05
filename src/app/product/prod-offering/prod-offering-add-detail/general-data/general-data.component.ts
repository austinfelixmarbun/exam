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
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  providers: [NGXToastrService]
})
export class GeneralDataComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService
  ) { }


  RefGeneralDataForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      ProdDId: [''],
      ProdHId: [''],
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

  ngOnInit() {

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";

    // Get Data Input
    this.UrlBackEnd = AdInsConstant.GetProductOfferingComponent;
    var ProdOfferingComponent = {
      GroupCodes: [
        "GEN"
      ],
      RowVersion: ""
    }

    this.items = this.RefGeneralDataForm.get('items') as FormArray;
    this.http.post(this.UrlBackEnd, ProdOfferingComponent).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj = response["ReturnObject"].length;

        if (lengthDataReturnObj) {
          for (var i = 0; i < lengthDataReturnObj; i++) {
            var eachDataDetail = this.fb.group({
              ProdDId: response["ReturnObject"][i].ProdDId,
              ProdHId: response["ReturnObject"][i].ProdHId,
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
              }
              )])
            }) as FormGroup;
            // Get DDL
            this.resolveDDL(eachDataDetail, i);
            // Push Data
            this.items.push(eachDataDetail);
          }
        }
        this.items.removeAt(0);
        console.log("cek form");
        console.log(this.RefGeneralDataForm);
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
    var ddlArray = this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownList as FormArray;
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
