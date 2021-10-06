import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { URLConstantX } from 'app/impl/shared/constant/URLConstantX';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CustGrpObj } from 'app/shared/model/CustGrpObj.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-detail-x',
  templateUrl: './customer-company-detail-x.component.html',
  styleUrls: ['./customer-company-detail-x.component.css']
})
export class CustomerCompanyDetailXComponent implements OnInit {

  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  lookupCustGrpObj: InputLookupObj = new InputLookupObj();
  lookUpObj: InputLookupObj;
  CustGrpObj: CustGrpObj = new CustGrpObj();
  criteriaObj: CriteriaObj;
  criteriaList: Array<CriteriaObj>;
  inputLookupCommodityObj: InputLookupObj;

  tempCustObj: CustObj;
  tempCustCompanyObj: any;
  tempRefIndustryObj: any;

  custCompanyObj: CustCompanyObj;
  refIndustryTypeObj: RefIndustryTypeObj;

  tempRefSectorEconomySlik: any;

  returnSectorEconomySlikObj: any;

  IdCust: number;
  tempRefIndustryTypeId: number = 0;
  Page: String;

  CustomerDetailForm = this.fb.group({
    NumOfEmp: ['', [Validators.maxLength(100), Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    MrCustModelCode: [''],
    IsSkt: [false],
    IsVip: [false],
    VipNotes: [''],
    IsAffiliateWithMf: [false],
    CommodityCode: ['']
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  async ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.lookUpObj = new InputLookupObj();

    //Lookup Commodity
    this.inputLookupCommodityObj = new InputLookupObj();
    this.inputLookupCommodityObj.urlJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.pagingJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.genericJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.isRequired = true;

    this.lookUpObj.urlJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";

    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, false, URLConstant.GetListActiveRefMasterWithMappingCodeAll);

    this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.tempCustObj = response
        this.CustomerDetailForm.patchValue({
          MrCustModelCode: response.MrCustModelCode,
          IsVip: response.IsVip,
          VipNotes: response.VipNotes,
          IsAffiliateWithMf: response.IsAffiliateWithMf,
        });
        this.checkState();
        this.setLookupCustGrp();
      }
    );


    this.http.post(URLConstantX.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustCompanyObj = response['responseCustCompanyObj'];
        this.tempRefSectorEconomySlik = response['RefSectorEconomySlikXId'];

        this.CustomerDetailForm.patchValue({
          NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
          EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
          IsSkt: this.tempCustCompanyObj.IsSkt
        });

        // if (this.tempCustCompanyObj.RefIndustryTypeId != null) {
        //   this.refIndustryTypeObj = new RefIndustryTypeObj();
        //   this.refIndustryTypeObj.RefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
        //   this.http.post(URLConstant.GetRefIndustryTypeById, { Id: this.tempCustCompanyObj.RefIndustryTypeId }).subscribe(
        //       (response) => {
        //         this.tempRefIndustryObj = response; 
        //         this.tempRefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
        //         this.lookUpObj.nameSelect = this.tempRefIndustryObj.IndustryTypeName; 
        //         this.lookUpObj.jsonSelect = response;
        //       });
        // }
      }
    );
    this.http.post(URLConstant.GetListCustGrpByMemberCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        if(response[CommonConstant.ReturnObj].length > 0){
          let reqById: GenericObj = new GenericObj();
          reqById.Id = response[CommonConstant.ReturnObj][0].CustId;
          this.http.post(URLConstant.GetCustByCustId, reqById).subscribe(
            (responseCustGrp) => {
              this.lookupCustGrpObj.nameSelect = responseCustGrp["CustName"];
              this.lookupCustGrpObj.jsonSelect = { CustName: responseCustGrp["CustName"] };
              this.lookupCustGrpObj.isReady = true;
              this.CustGrpObj.CustId = responseCustGrp["CustId"];
            });
        }
      }
    );
    await this.getCustXData();

  }

  GetCustGrpData(event) {
    this.CustGrpObj.CustId = event.CustId;
  }

  setLookupCustGrp() {
    this.lookupCustGrpObj.urlJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.pagingJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.genericJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.isRequired = false;
    this.lookupCustGrpObj.isReady = true;

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaObj.propName = 'C.CUST_NO';
    this.criteriaObj.value = this.tempCustObj.CustNo;
    this.criteriaList.push(this.criteriaObj);
    this.lookupCustGrpObj.addCritInput = this.criteriaList;
  }
  async getCustXData()
  {
    await this.http.post(URLConstantX.GetCustXDataByCustId, {Id: this.IdCust}).toPromise().then(
      (response) => {
        if(response["CustXId"] != 0){
          this.CustomerDetailForm.patchValue({
            CommodityCode: response["MrCommodityCode"]
          });
          this.inputLookupCommodityObj.nameSelect = response["CommodityName"];
          this.inputLookupCommodityObj.jsonSelect = { Descr: response["CommodityName"] };
        }

        if (this.tempCustCompanyObj.RefIndustryTypeId != null && this.tempRefSectorEconomySlik != null &&
          this.tempCustCompanyObj.RefIndustryTypeId != 0 && this.tempRefSectorEconomySlik != 0) {
          this.http.post(URLConstantX.GetRefSectorEconomySlikXById, {Id: this.tempRefSectorEconomySlik}).subscribe(
            (response) => {
              this.returnSectorEconomySlikObj = response;
              this.lookUpObj.nameSelect = this.returnSectorEconomySlikObj.SectorEconomySlikName;
              this.lookUpObj.jsonSelect = this.returnSectorEconomySlikObj;
              this.tempRefIndustryTypeId = this.returnSectorEconomySlikObj.RefIndustryTypeId;
            }
          );
        }
      }
    );
  }

  SaveValue() {
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custCompanyObj.NumOfEmp = this.CustomerDetailForm.controls["NumOfEmp"].value;
    this.custCompanyObj.EstablishmentDt = this.CustomerDetailForm.controls["EstablishmentDt"].value;
    this.custCompanyObj.IsSkt = this.CustomerDetailForm.controls["IsSkt"].value;
    this.custCompanyObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
    this.custCompanyObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
    this.custCompanyObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    this.custCompanyObj.MrCustModelCode = this.CustomerDetailForm.controls["MrCustModelCode"].value;
    this.custCompanyObj.ParentCustId = this.CustGrpObj.CustId;

    if (this.returnSectorEconomySlikObj != null && this.tempRefIndustryTypeId === null) {
      this.custCompanyObj.RefIndustryTypeId = this.custCompanyObj.RefIndustryTypeId;
    }
    else {
      this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;
    }

    let custXObj = {
      CustId: this.IdCust,
      MrCommodityCode: this.CustomerDetailForm.controls.CommodityCode.value,
    };

    let CustCompanyObjX = {
      CustId: this.IdCust,
      RefSectorEconomySlikXId: this.tempRefSectorEconomySlik
    }

    let reqObj = {
      CustCompanyObj: this.custCompanyObj,
      CustXObj: custXObj,
      CustCompanyObjX: CustCompanyObjX
    }

    this.http.post(URLConstantX.EditCustCompany, reqObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.outputTab.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId, stepMode: 'next' });
      }
    );
  }

  getLookUp(event) {
    this.tempRefSectorEconomySlik = event.RefSectorEconomySlikXId;
    this.tempRefIndustryTypeId = event.RefIndustryTypeId;
  }

  checkState() {
    if (!this.CustomerDetailForm.controls.IsVip.value) {
      this.CustomerDetailForm.patchValue({
        VipNotes: null
      });
      this.CustomerDetailForm.controls.VipNotes.disable();
      this.CustomerDetailForm.controls.VipNotes.clearAsyncValidators();

    } else {
      this.CustomerDetailForm.controls.VipNotes.enable();
      this.CustomerDetailForm.controls.VipNotes.setValidators(Validators.required);

    }
    this.CustomerDetailForm.controls.VipNotes.updateValueAndValidity();
  }

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    }
    else {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    }
  }

  setLookupCommodityData(ev){
    this.CustomerDetailForm.patchValue({
      CommodityCode: ev.MasterCode
    });
  }

}
