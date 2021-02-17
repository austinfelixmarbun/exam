import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CoaSchmObj } from 'app/shared/model/common-setting/CoaSchmObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { environment } from 'environments/environment';
import { RefCoaObj } from 'app/shared/model/common-setting/RefCoaObj.Model';
import { jitExpression } from '@angular/compiler';

@Component({
  selector: 'app-coa-scheme-detail',
  templateUrl: './coa-scheme-detail.component.html'
})
export class CoaSchemeDetailComponent implements OnInit {
  ListCoa: FormArray;
  ListCopy: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  cekHead: boolean = false;
  ListCurr: Array<KeyValueObj> = new Array<KeyValueObj>();
  ListSelectedCurr: Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  MrPayAllocGrpCode: string = "PAY_ALLOC_COA_SCHM";

  CoaValue: string = "";
  SchemeCode: string = "";
  SchemeName: string = "";
  mode: string = "";
  coaSchmId: string = "";
  coaSchmObj: CoaSchmObj = new CoaSchmObj();
  refCoaObj: RefCoaObj = new RefCoaObj();
  ListRefCoaObj: Array<RefCoaObj> = new Array<RefCoaObj>();

  CoaSchemeForm = this.fb.group({
    SchemeCode: ['', Validators.required],
    SchemeName: ['', Validators.required],
    IsActive: [false],
    //ListCoa: this.fb.array([])
    ListCoa: this.fb.array([ this.createItem() ])
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['CoaSchmId'] != null) {
        this.coaSchmId = params['CoaSchmId'];
      }
      if (params['mode'] != null) {
        this.mode = params['mode'];
      }
    });
  }

  ngOnInit() {
    this.colHeadTable = [];
    this.GetDdlCurr();
    
    if (this.mode === "Edit") {
      this.CoaSchemeForm.controls["SchemeCode"].disable();
      this.GetCoaSchmData();
    }else{
      this.GetListPaymentAlloc();
    }
    
    this.ListCopy = [
     
    ];
  }
  createItem(): FormGroup {
    return this.fb.group({
      COA: ''
    });
  }

  addItem(): void {
    this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
    this.ListCoa.push(this.createItem());
  }

  GetDdlCurr() {
    this.http.post<any>(environment.FoundationR3Url + '/RefCurr/GetListKvpActiveRefCurr', {}).subscribe
      (
        (response: any) => {
          this.ListCurr = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      )
  }

  GetListPaymentAlloc(){

    this.http.post<any>(URLConstant.GetListKeyValueRefPaymentAllocByPayAllocGrpCode, {MrPayAllocGrpCode: this.MrPayAllocGrpCode}).subscribe(
      (response: any) => {
        this.ListPaymentAlloc = response.ReturnObject

      },
      (error) => {
        console.log(error)
      }
    );
  }

  GetCoaSchmData() {
    this.http.post<CoaSchmObj>(URLConstant.GetCoaSchmByCoaSchmId, { CoaSchmId: +this.coaSchmId }).subscribe(
      (response) => {
        this.coaSchmObj = response;

        this.CoaSchemeForm.patchValue({
          SchemeCode: this.coaSchmObj.SchmCode,
          SchemeName: this.coaSchmObj.SchmName,
          IsActive: this.coaSchmObj.IsActive
        })
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }

  Add(ev: HTMLInputElement) {
    for (let i = 0; i < this.colHeadTable.length; i++) {
      if (this.colHeadTable[i].newHead == 'COA ' + ev.value) {
        this.cekHead = true;
        break;
      }
      else { this.cekHead = false; }
    }
    if (!this.cekHead) {
      this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
      this.ListCoa.push(this.createItem());
      this.colHeadTable.push({ newHead: 'COA ' + ev.value });
      this.ListSelectedCurr.push({ newCurr: ev.value });
    }
  }

  copy() {
    this.CoaValue = "COA SHEME";
  }

  Submit() {
    console.log(this.CoaSchemeForm);
    this.coaSchmObj.SchmCode = this.CoaSchemeForm.controls["SchemeCode"].value;
    this.coaSchmObj.SchmName = this.CoaSchemeForm.controls["SchemeName"].value;
    this.coaSchmObj.IsActive = this.CoaSchemeForm.controls["IsActive"].value;
    this.ListRefCoaObj = new Array<RefCoaObj>();
    for (let i = 0; i < this.ListSelectedCurr.length; i++) {
      for(let j = 0; j < this.ListPaymentAlloc.length; j++){
        this.refCoaObj = new RefCoaObj();
        this.refCoaObj.RefAcctBookId = 1;
        this.refCoaObj.MrEntityCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.MrEntityType = "PAY_ALLOC";
        this.refCoaObj.CurrCode = this.ListSelectedCurr[i].newCurr;
        this.refCoaObj.PaymentAllocCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.Coa = this.CoaSchemeForm.controls["ListCoa"].value[j].COA;   
        this.ListRefCoaObj.push(this.refCoaObj);
      } 
    }
    this.coaSchmObj.ListRefCoa = this.ListRefCoaObj;

    console.log(this.coaSchmObj);
    
    this.http.post(URLConstant.SubmitCoaSchm, this.coaSchmObj).subscribe(
      (response) => {
        this.router.navigate(['/CommonSetting/coascheme/paging']);
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}