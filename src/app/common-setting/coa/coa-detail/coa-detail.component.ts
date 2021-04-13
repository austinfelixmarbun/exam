import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { first } from 'rxjs/operators';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefCoaObj } from 'app/shared/model/common-setting/RefCoaObj.Model';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coa-detail',
  templateUrl: './coa-detail.component.html'
})
export class CoaDetailComponent implements OnInit {
  ListCurr: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  ListCOA: Array<any> = new Array<any>();
  ListEntityType: Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  ListCurrCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  entityTypeList: any;
  entitySelect: string = "";
  entityTypeSelect: any;
  refCoaObj: RefCoaObj = new RefCoaObj();
  ListRefCoaObj: Array<RefCoaObj> = new Array<RefCoaObj>();
  CoaForm = this.fb.group({
    SchemeCode: ['', Validators.required],
    SchemeName: ['', Validators.required],
    IsActive: [false],
    //ListCoa: this.fb.array([])
    ListCoa: this.fb.array([ this.createItem() ])
  });
  
  Shows: boolean = false;

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: NGXToastrService,
    private http: HttpClient) {
  }

  ngOnInit() {
    var refMasterEntityType = new RefMasterObj();

    refMasterEntityType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeEntityType;
    this.GetDdlCurr();

    this.http.post(URLConstant.GetListActiveRefMaster, refMasterEntityType).pipe(first()).subscribe(
      (response) => {
        this.entityTypeList = response["ReturnObject"];
      }
    );

    this.colHeadTable = [];
  }

  GetDdlCurr() {
    this.http.post(environment.FoundationR3Url + '/RefCurr/GetListKvpActiveRefCurr', null).subscribe(
      (response) => {
        this.ListCurrCode = response["ReturnObject"]
      },
      (error) => {
        console.log(error)
      }
    );
  }

  Add(ev: HTMLInputElement) {
    this.colHeadTable.push({ newHead: 'COA ' + ev.value });
    this.ListCurr.push({ newCurr: 'IDR' });
  }

  Submit() {
    this.ListRefCoaObj = new Array<RefCoaObj>();
    for (let i = 0; i < this.ListCurr.length; i++) {
      for(let j = 0; j < this.ListCOA.length; j++){
        this.refCoaObj = new RefCoaObj();
        this.refCoaObj.RefAcctBookId = 1;
        this.refCoaObj.MrEntityCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.MrEntityType = "PAY_ALLOC";
        this.refCoaObj.CurrCode = this.ListCurr[i].newCurr;
        this.refCoaObj.PaymentAllocCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.Coa = this.CoaForm.controls["ListCoa"].value[j].COA;   
        this.ListRefCoaObj.push(this.refCoaObj);
      } 
    }

    this.http.post(URLConstant.SubmitCoaSchm, this.ListRefCoaObj).subscribe(
      (response) => {
        this.router.navigate(['/CommonSetting/coascheme/paging']);
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );

    this.toastr.successMessage('Success');
    this.router.navigate([NavigationConstant.CS_COA_PAGING]);
  }

  async Show(ev: HTMLInputElement) {
    
    this.ListCOA = new Array<any>();
    this.entitySelect = ev.value;
    this.entityTypeSelect = this.entityTypeList.filter(
      comp => comp.Key == this.entitySelect);

    if(this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypePayAlloc){

      await this.http.post<any>(URLConstant.GetListKeyValueRefPaymentAllocActive, {}).toPromise().then(
        (response: any) => {
          this.ListPaymentAlloc = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      );

      for(let j = 0; j < this.ListPaymentAlloc.length; j++){
        var coa = new Array<any>();
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            PaymentAllocCode: this.ListPaymentAlloc[j].Key,
            EntityCode: this.ListPaymentAlloc[j].Key,
          }
        ];
        this.ListCOA.push({coa });
      } 

    }else if(this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeOffice){

      await this.http.post<any>(URLConstant.GetListKvpActiveRefOffice, {}).toPromise().then(
        (response: any) => { 
          this.ListPaymentAlloc = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      );

      for(let j = 0; j < this.ListPaymentAlloc.length; j++){
        var coa = new Array<any>();
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            PaymentAllocCode: "RK",
            EntityCode: this.ListPaymentAlloc[j].Key,
          }
        ];
        this.ListCOA.push({coa });
      } 


    }else if(this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeSuppl){
      await this.http.post<any>(URLConstant.GetListKeyValueRefPaymentAllocByPayAllocGrpCode, {Code: this.entitySelect}).toPromise().then(
        (response: any) => {
          this.ListPaymentAlloc = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      );

      for(let j = 0; j < this.ListPaymentAlloc.length; j++){
        var coa = new Array<any>();
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            PaymentAllocCode: this.ListPaymentAlloc[j].Key,
            EntityCode: this.ListPaymentAlloc[j].Key,
          }
        ];
        this.ListCOA.push({coa });
      } 
    
    }else{

    }
    this.Shows = true;
  }

  createItem(): FormGroup {
    return this.fb.group({
      COA: ''
    });
  }
}