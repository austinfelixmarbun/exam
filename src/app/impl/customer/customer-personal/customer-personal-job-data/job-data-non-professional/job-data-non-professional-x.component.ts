import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {AdInsConstant} from 'app/shared/AdInstConstant';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {CustObj} from 'app/shared/model/cust-obj.model';
import {InputLookupObj} from 'app/shared/model/input-lookup-obj.model';
import {CustPersonalJobDataObj} from 'app/shared/model/cust-personal-job-data-obj.model';
import {RequestCustPersonalJobDataObj} from 'app/shared/model/request-cust-personal-job-data-obj.model';
import {CriteriaObj} from 'app/shared/model/criteria-obj.model';
import {NewCustSetData} from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';

@Component({
  selector: 'app-job-data-non-professional-x',
  templateUrl: './job-data-non-professional-x.component.html',
  styleUrls: ['./job-data-non-professional-x.component.css']
})
export class JobDataNonProfessionalXComponent implements OnInit {
  @Input() IsReset: boolean = false;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  jobDataId: any;
  typePage: string;
  rowVersion: string
  IdCust: number;
  IdCustPersonal: number;
  custObj: any;
  objCust: CustObj;
  tempProfession: number;
  professionLookUpObj: InputLookupObj;
  inputLookupCommodityObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  returnRefProfessionObj: any;
  JobDataNonProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobTitleName: [''],
    CommodityCode: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params['IdCust'] != null) {
        this.IdCust = params['IdCust'];
      }
      if (params['IdCustPersonal'] != null) {
        this.IdCustPersonal = params['IdCustPersonal'];
      }
    });
  }

  getLookUpProfession(event) {
    this.tempProfession = event.RefProfessionId;
  }


  async ngOnInit() {
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = './assets/lookup/lookupCustomerProfession.json';
    this.professionLookUpObj.pagingJson = './assets/lookup/lookupCustomerProfession.json';
    this.professionLookUpObj.genericJson = './assets/lookup/lookupCustomerProfession.json';

    //Lookup Commodity
    this.inputLookupCommodityObj = new InputLookupObj();
    this.inputLookupCommodityObj.urlJson = './assets/impl/uclookup/lookupCommodity.json';
    this.inputLookupCommodityObj.pagingJson = './assets/impl/uclookup/lookupCommodity.json';
    this.inputLookupCommodityObj.genericJson = './assets/impl/uclookup/lookupCommodity.json';
    this.inputLookupCommodityObj.isRequired = true;

    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = 'text';
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = CommonConstant.CUST_MODEL_NONPROF;
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;


    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustByCustId, {Id: this.IdCust}).subscribe(
      (response) => {
        this.custObj = response;
      });

    this.http.post(URLConstant.GetCustPersonalJobDataByCustId, {Id: this.IdCust}).subscribe(
      (response: any) => {
        this.returnCustJobDataObj = response;

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataNonProForm.patchValue({
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
          });

          if (!this.IsReset && this.returnCustJobDataObj.RefProfessionId) {
            this.http.post(URLConstant.GetRefProfessionById, {Id: this.returnCustJobDataObj.RefProfessionId}).subscribe(
              (response) => {
                this.returnRefProfessionObj = response;

                this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
              });
          }

          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.typePage = 'edit';
        }
      });

    await this.getCustXData();
  }

  async getCustXData() {
    await this.http.post(URLConstantX.GetCustXDataByCustId, {Id: this.IdCust}).toPromise().then(
      (response) => {
        if (response['CustXId'] != 0) {
          this.JobDataNonProForm.patchValue({
            CommodityCode: response['MrCommodityCode']
          });
          this.inputLookupCommodityObj.nameSelect = response['CommodityName'];
          this.inputLookupCommodityObj.jsonSelect = {Descr: response['CommodityName']};
        }
      }
    );
  }

  setLookupCommodityData(ev) {
    this.JobDataNonProForm.patchValue({
      CommodityCode: ev.MasterCode
    });
  }

  async SaveForm(IsParent: boolean = false): Promise<boolean> {
    if (this.JobDataNonProForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.JobDataNonProForm);
      return false;
    }
    if (this.typePage == 'edit') {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls['JobTitleName'].value;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      let custXObj = {
        CustId: this.IdCust,
        MrCommodityCode: this.JobDataNonProForm.controls.CommodityCode.value,
      };

      let obj = {
        CustPersonalJobDataObj: this.reqCustPersonalJobDataObj,
        CustXObj: custXObj
      }
      await this.http.post(URLConstantX.EditCustPersonalJobData, obj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response['message']);

          if (!IsParent) {
            this.outputTab.emit({stepMode: 'next'});
          }
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls['JobTitleName'].value;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      let custXObj = {
        CustId: this.IdCust,
        MrCommodityCode: this.JobDataNonProForm.controls.CommodityCode.value,
      };

      let obj = {
        CustPersonalJobDataObj: this.reqCustPersonalJobDataObj,
        CustXObj: custXObj
      }
      await this.http.post(URLConstantX.AddCustPersonalJobData, obj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response['message']);
          if (!IsParent) {
            this.outputTab.emit({stepMode: 'next'});
          }
        }
      );
    }
    return true;
  }

}
