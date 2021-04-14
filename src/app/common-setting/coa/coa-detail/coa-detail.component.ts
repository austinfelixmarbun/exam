import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { first } from 'rxjs/operators';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefCoaObj } from 'app/shared/model/common-setting/RefCoaObj.Model';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-coa-detail',
  templateUrl: './coa-detail.component.html'
})
export class CoaDetailComponent implements OnInit {
  ListCurr: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  ListCOA: Array<any> = new Array<any>();
  ListOfCOA: Array<any> = new Array<any>();;
  ListEntityType: Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  ListCurrCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  entityTypeList: any;
  entitySelect: string = "";
  entityTypeSelect: any;
  refCoaObj: RefCoaObj = new RefCoaObj();
  ListRefCoaObj: Array<RefCoaObj> = new Array<RefCoaObj>();
  mode: string = "";
  coaId: string = "";
  CoaForm = this.fb.group({
    SchemeCode: [''],
    SchemeName: [''],
    IsActive: [false],
    ListCoa: this.fb.array([])
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
    if (ev.value == "-Select One-") {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_ONE);
    }
    else {
      var ListCurrBeforeAdd = [...this.ListCurr];
      var test = ListCurrBeforeAdd.indexOf(ev.value);
      if ((ListCurrBeforeAdd.findIndex(x => x.newCurr === ev.value)) === -1) {
        this.colHeadTable.push({ newHead: 'COA ' + ev.value });
        this.ListCurr.push({ newCurr: ev.value });
        var ListCoa = this.CoaForm.get('ListCoa') as FormArray;
        for (let i = 0; i < this.ListCOA.length; i++) {
          var ListDataCOA = this.ListCoa().get(i.toString()).get("DataCOA") as FormArray;
          ListDataCOA.push(this.createDetailItem());
        }
      }
      else {
        this.toastr.warningMessage(ExceptionConstant.ALREADY_EXIST);
      }
    }
  }

  newCoa(): FormGroup {
    return this.fb.group({
      DataCOA: this.fb.array([])
    })
  }

  createDetailItem(): FormGroup {
    return new FormGroup({
      COA: new FormControl('')
    });
  }

  // newCoa(): FormGroup {
  //   return this.fb.group({
  //     COA: ''
  //   })
  // }

  ListCoa(): FormArray {
    return this.CoaForm.get("ListCoa") as FormArray
  }

  GetListCoa() {
    this.ListOfCOA = new Array<any>();;
    for (let i = 0; i < this.ListCOA.length; i++) {
      for (let j = 0; j < this.ListCurr.length; j++) {
        var coaValue = new Array<any>();
        coaValue = [
          {
            EntityType: this.ListCOA[i].coa[0].EntityType,
            PaymentAllocCode: this.ListCOA[i].coa[0].PaymentAllocCode,
            EntityCode: this.ListCOA[i].coa[0].EntityCode,
            CurrCode: this.ListCurr[j].newCurr,
            Coa: this.CoaForm.get("ListCoa").get(i.toString()).get("DataCOA").value[j].COA
            // Coa: this.ListCoa().get(i.toString()).get('COA')[j].value
            // Coa: this.ListCoa().get(i.toString()).value.COA
          }
        ];
        this.ListOfCOA.push(coaValue);
      }
    }
  }

  Submit() {
    this.ListRefCoaObj = new Array<RefCoaObj>();
    // for (let i = 0; i < this.ListCurr.length; i++) {
    //   for (let j = 0; j < this.ListCOA.length; j++) {
    //     this.refCoaObj = new RefCoaObj();
    //     this.refCoaObj.RefAcctBookId = 1;
    //     this.refCoaObj.MrEntityCode = this.ListPaymentAlloc[j].Key;
    //     this.refCoaObj.MrEntityType = "PAY_ALLOC";
    //     this.refCoaObj.CurrCode = this.ListCurr[i].newCurr;
    //     this.refCoaObj.PaymentAllocCode = this.ListPaymentAlloc[j].Key;
    //     this.refCoaObj.Coa = this.CoaForm.controls["ListCoa"].value[j].COA;
    //     this.ListRefCoaObj.push(this.refCoaObj);
    //   }
    // }
    this.GetListCoa();
    for (let i = 0; i < this.ListOfCOA.length; i++) {
      this.refCoaObj = new RefCoaObj();
      this.refCoaObj.RefAcctBookId = 1;
      this.refCoaObj.MrEntityCode = this.ListOfCOA[i][0].EntityCode;
      this.refCoaObj.MrEntityType = "PAY_ALLOC";
      this.refCoaObj.CurrCode = this.ListOfCOA[i][0].CurrCode;
      this.refCoaObj.PaymentAllocCode = this.ListOfCOA[i][0].PaymentAllocCode;
      this.refCoaObj.Coa = this.ListOfCOA[i][0].Coa;
      this.ListRefCoaObj.push(this.refCoaObj);
      console.log(this.ListOfCOA[i])
      console.log(this.ListRefCoaObj)
    }

    var RequestListRefCoa = {
      ListRequestRefCoaObjs: this.ListRefCoaObj
    }
    this.http.post(URLConstant.SubmitListCoa, RequestListRefCoa).subscribe(
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

    this.entitySelect = ev.value;
    if (ev.value == "") {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_ONE);
    }
    else {
      this.ListCOA = new Array<any>();
      this.entityTypeSelect = this.entityTypeList.filter(
        comp => comp.Key == this.entitySelect);

      if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypePayAlloc) {

        await this.http.post<any>(URLConstant.GetListKeyValueRefPaymentAllocActive, {}).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
          var coa = new Array<any>();
          coa = [
            {
              EntityType: this.entityTypeSelect[0].Value,
              PaymentAllocCode: this.ListPaymentAlloc[j].Key,
              EntityCode: this.ListPaymentAlloc[j].Key,
            }
          ];
          this.ListCOA.push({ coa });
          this.ListCoa().push(this.newCoa());
        }

      } else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeOffice) {

        await this.http.post<any>(URLConstant.GetListKvpActiveRefOffice, {}).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
          var coa = new Array<any>();
          coa = [
            {
              EntityType: this.entityTypeSelect[0].Value,
              PaymentAllocCode: "RK",
              EntityCode: this.ListPaymentAlloc[j].Key,
            }
          ];
          this.ListCOA.push({ coa });
          this.ListCoa().push(this.newCoa());
        }


      } else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeSuppl) {
        await this.http.post<any>(URLConstant.GetListKeyValueRefPaymentAllocByPayAllocGrpCode, { Code: this.entitySelect }).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
          var coa = new Array<any>();
          coa = [
            {
              EntityType: this.entityTypeSelect[0].Value,
              PaymentAllocCode: this.ListPaymentAlloc[j].Key,
              EntityCode: this.ListPaymentAlloc[j].Key,
            }
          ];
          this.ListCOA.push({ coa });
          this.ListCoa().push(this.newCoa());
        }

      } else {

      }
      this.Shows = true;
    }
  }
}