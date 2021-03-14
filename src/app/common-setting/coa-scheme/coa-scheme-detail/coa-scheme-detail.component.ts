import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CoaSchmObj } from 'app/shared/model/common-setting/CoaSchmObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { environment } from 'environments/environment';
import { RefCoaObj } from 'app/shared/model/common-setting/RefCoaObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-coa-scheme-detail',
  templateUrl: './coa-scheme-detail.component.html'
})
export class CoaSchemeDetailComponent implements OnInit {
  ListCoa: FormArray;
  ListDataCOA: FormArray;
  ListCopy: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  cekHead: boolean = false;
  ListCurr: Array<KeyValueObj> = new Array<KeyValueObj>();
  ListSelectedCurr: Array<any> = new Array<any>();
  ListGetCoaCurr:  Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  MrPayAllocGrpCode: string = "PAY_ALLOC_COA_SCHM";

  CountAdd: number = 0;
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
    ListCoa: this.fb.array([])
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
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
      this.GetListPaymentAlloc();
      this.GetCoaSchmDetail();
    }else{
      this.GetListPaymentAlloc();
    }
    this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
    this.ListCopy = [
     
    ];
  }

  Add(ev: HTMLInputElement) {
    for (let i = 0; i < this.colHeadTable.length; i++) {
      if (this.colHeadTable[i].newHead == 'COA ' + ev.value) {
        this.cekHead = true;
        break;
      }
      else { this.cekHead = false; }
    }

    console.log("masuk add")

    if (!this.cekHead) {
      this.colHeadTable.push({ newHead: 'COA ' + ev.value });
      this.ListSelectedCurr.push({ newCurr: ev.value });
      this.CountAdd = this.CountAdd + 1;

      if(this.CountAdd !== 1){
        this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
        for(let i = 0; i < this.ListPaymentAlloc.length; i++){
          this.ListDataCOA = this.ListCoa.controls[i].get('DataCOA') as FormArray;
          this.ListDataCOA.push(this.createDetailItem());
        } 
        console.log("Isi list COA saat Add")
        console.log(this.ListCoa)
      }
      
    }
    
  }
  
  createItem(): FormGroup {
    return this.fb.group({
      DataCOA: this.fb.array([
        this.createDetailItem()
      ])
    })
  }

  createDetailItem(): FormGroup{
    return new FormGroup({
        COA: new FormControl('')
    });
  }

  copy() {
    this.CoaValue = "COA SHEME";
  }

  Submit() {
    console.log(this.CoaSchemeForm);
    this.coaSchmObj.SchmCode = this.CoaSchemeForm.controls["SchemeCode"].value;
    this.coaSchmObj.SchmName = this.CoaSchemeForm.controls["SchemeName"].value;
    this.coaSchmObj.IsActive = this.CoaSchemeForm.controls["IsActive"].value;
    console.log("isi coa scheme form sebelum submit")
    console.log(this.CoaSchemeForm.controls["ListCoa"]);
    console.log("test isi get")
    console.log(this.CoaSchemeForm.get("ListCoa").get("0").get("DataCOA").value[0].COA)
    console.log(this.CoaSchemeForm.get("ListCoa").get("0").get("DataCOA").value[1].COA)
    console.log(this.CoaSchemeForm.get("ListCoa").get("1").get("DataCOA").value[0].COA)
    console.log(this.CoaSchemeForm.get("ListCoa").get("1").get("DataCOA").value[1].COA)
    this.ListRefCoaObj = new Array<RefCoaObj>();
    for (let i = 0; i < this.ListSelectedCurr.length; i++) {
      for(let j = 0; j < this.ListPaymentAlloc.length; j++){
        this.refCoaObj = new RefCoaObj();
        this.refCoaObj.RefAcctBookId = 1;
        this.refCoaObj.MrEntityCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.MrEntityType = "PAY_ALLOC";
        this.refCoaObj.CurrCode = this.ListSelectedCurr[i].newCurr;
        this.refCoaObj.PaymentAllocCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.Coa = this.CoaSchemeForm.get("ListCoa").get(j.toString()).get("DataCOA").value[i].COA;   
        this.ListRefCoaObj.push(this.refCoaObj);
      } 
    }
    this.coaSchmObj.ListRefCoa = this.ListRefCoaObj;

    console.log(this.coaSchmObj);
    
    this.http.post(URLConstant.SubmitCoaSchm, this.coaSchmObj).subscribe(
      (response) => {
        this.router.navigate([NavigationConstant.CS_COA_SCHM_PAGING]);
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
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

        this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
        for(let i = 0; i < this.ListPaymentAlloc.length; i++){
          this.ListCoa.push(this.createItem());
        }
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

  GetCoaSchmDetail() {
    this.http.post<any>(URLConstant.GetListRefCoaByCoaSchmId, { CoaSchmId: +this.coaSchmId }).subscribe(
      (response) => {
        this.ListRefCoaObj = response;
        this.ListGetCoaCurr = this.ListRefCoaObj.map(item => item.CurrCode)
        .filter((value, index, self) => self.indexOf(value) === index);

        this.ListCoa = this.CoaSchemeForm.get('ListCoa') as FormArray;
        for (let i = 0; i < this.ListGetCoaCurr.length; i++){
          for(let x = 0; x < this.ListPaymentAlloc.length; x++){
            if(x !== 0){
            this.ListDataCOA = this.ListCoa.controls[i].get('DataCOA') as FormArray;
            this.ListDataCOA.push(this.createDetailItem());
            }
          }
          this.colHeadTable.push({ newHead: 'COA ' + this.ListGetCoaCurr[i] });
          this.ListSelectedCurr.push({ newCurr: this.ListGetCoaCurr[i] });
        }

        for (let i = 0; i < this.ListRefCoaObj.length; i++) {
          for(let j = 0; j < this.ListPaymentAlloc.length; j++){
            if(this.ListPaymentAlloc[j].Key === this.ListRefCoaObj[i].PaymentAllocCode){
              for(let x = 0; x < this.ListSelectedCurr.length; x++){
                if(this.ListSelectedCurr[x].newCurr === this.ListRefCoaObj[i].CurrCode){
                  this.ListDataCOA = this.ListCoa.controls[j].get('DataCOA') as FormArray;
                  this.ListDataCOA.controls[x].patchValue({
                    COA: this.ListRefCoaObj[i].Coa
                  });
                  console.log("isi List Coa yg ke " + j)
                  console.log(this.CoaSchemeForm.controls["ListCoa"])

                }
              }
            }
          } 
        }
        console.log("List Curr");
        console.log(this.ListRefCoaObj);
        console.log(this.ListPaymentAlloc);
        console.log(this.ListSelectedCurr);
        console.log(this.CoaSchemeForm);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}