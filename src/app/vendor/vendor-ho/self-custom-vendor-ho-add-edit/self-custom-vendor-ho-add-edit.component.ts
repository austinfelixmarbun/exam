import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { FormDropDownListService } from '@adins/ucform';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';

@Component({
  selector: 'app-self-custom-vendor-ho-add-edit',
  templateUrl: './self-custom-vendor-ho-add-edit.component.html'
})
export class SelfCustomVendorHoAddEditComponent implements OnInit {
  pageName: string;
  MrVendorCategoryCode: string;
  MrIdTypeCode: string;
  itemIdType: Array<KeyValueObj>;
  MrVendorTypeCode: string;
  VendorId: number = 0;

  Form: FormGroup = this.fb.group({});

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ddlSvc: FormDropDownListService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["MrVendorCategoryCode"] != null) {
          this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      }

      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }
    });

    this.pageName = 'VendorHoRegistration'
    if (this.MrVendorCategoryCode != CommonConstant.SUPPLIER_HO && this.MrVendorCategoryCode != CommonConstant.ASSET_INSCO_HO)
    {
      this.pageName = 'VendorHoRegistration'
    }
    else if (this.MrVendorCategoryCode != CommonConstant.SUPPLIER_HO)
    {
      this.pageName = 'SupplierHoRegistration'
    }
  }

  async ngOnInit() {
    if (this.VendorId > 0)
    {
      let ReqGetVendorAndVendorAddr : GenericObj = new GenericObj();
      ReqGetVendorAndVendorAddr.Id = this.VendorId;
      await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
        (response: any) => {
        this.MrIdTypeCode = response.VendorObj.MrIdTypeCode;
      })
    }
  }

  onFormCreate(fg: FormGroup)
  {
    this.Form = fg;

  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {

    if (this.Form.controls.MrVendorTypeCode != undefined)
    {
      this.MrVendorTypeCode = this.Form.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL? "PERSONAL" : "COMPANY"
    }
    else
    {
      this.MrVendorTypeCode = "COMPANY"
    }

    let refMasterIdObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
      MappingCode: this.MrVendorTypeCode
    }
    this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = new Array<KeyValueObj>();
        this.itemIdType = response[CommonConstant.ReturnObj];

        this.ddlSvc.SetDictDDL('MrIdTypeCode', this.itemIdType)

        let res = this.itemIdType.filter((x) => {return x.Key == this.MrIdTypeCode})
        
        this.Form.patchValue({
          MrIdTypeCode: this.VendorId == 0 || res.length == 0? this.itemIdType[0].Key : this.MrIdTypeCode
        })
      }
    );
  }

}
