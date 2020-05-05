import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from "rxjs/operators";
import { RefUserObj } from 'app/shared/model/RefUserObj.Model';
import { EmpBankAccObj } from 'app/shared/model/EmpBankAccObj.Model';
import { forkJoin } from 'rxjs';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  inputLookupObj: any;
  inputLookupObj2: any;
  officeObj: any;
  RefEmpForm = this.fb.group({
    EmpNo: [''],
    EmpName: [''],
    IsActive: [true]
  });
  private getEmpUrl: string = AdInsConstant.GetRefEmployeeById;
  private getRefBankUrl: string = AdInsConstant.GetRefBankByRefBankIdAsync;
  private getRefUserUrl: string = environment.FoundationR3Url + AdInsConstant.GetRefUserByRefEmpId;
  private getEmpBankUrl: string = environment.FoundationR3Url + AdInsConstant.GetEmpBankAccByRefEmpId;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.inputLookupObj2 = new InputLookupObj();
    this.inputLookupObj2.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj2.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupObj2.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj2.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj2.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";


    // this.officeObj = new OfficeObj();
    // this.officeObj.RefOfficeId = 5;
    // this.httpClient.post(AdInsConstant.GetRefOfficeByRefOfficeId, this.officeObj).subscribe(
    //   (response) => {
    //     this.httpClient.post(AdInsConstant.GetRefOfficeByRefOfficeId, this.officeObj).subscribe(
    //       (response) => {
    //         console.log(response);
    //         // this.inputLookupObj.jsonSelect = { Zipcode: response["Zipcode"] };
    //         this.inputLookupObj.nameSelect = response["Zipcode"];
    //         this.inputLookupObj2.nameSelect = response["AreaCode2"];
    //       });
    //   });

    var empObj = new RefEmpObj();
    empObj.RefEmpId = 13;
    
    this.httpClient.post(this.getEmpUrl, empObj).pipe(
      map( response => {
        return response;
      }),
      mergeMap((response: any) => {
        var tempRefUser = new RefUserObj();
        tempRefUser.RefEmpId = response.RefEmpId;
        var tempEmpBankAcc = new EmpBankAccObj();
        tempEmpBankAcc.RefEmpId = response.RefEmpId;

        var tempResponse = [];
        tempResponse.push(response);

        const refUserObj = this.httpClient.post(this.getRefUserUrl, tempRefUser);
        const empBankAccObj = this.httpClient.post(this.getEmpBankUrl, tempEmpBankAcc);

        return forkJoin([tempResponse, refUserObj, empBankAccObj]);
      }),
      mergeMap((response: any) => {
        var tempRefBank = new RefBankObj();
        tempRefBank.RefBankId = response[2].RefBankId;

        var tempResponseEmp = [];
        tempResponseEmp.push(response[0]);
        var tempResponseUsr = [];
        tempResponseUsr.push(response[1]);
        var tempResponseEmpBank = [];
        tempResponseEmpBank.push(response[2]);

        const refBankObj = this.httpClient.post(this.getRefBankUrl, tempRefBank);

        return forkJoin([tempResponseEmp, tempResponseUsr, tempResponseEmpBank, refBankObj]);
      })
    ).subscribe(
      (response: any) => {
        var refEmpData = response[0];
        var refUserData = response[1];
        var empBankAccData = response[2];
        var refBankData = response[3];

        this.inputLookupObj.nameSelect = refEmpData.Zipcode;
        this.inputLookupObj2.nameSelect = refBankData.BankName;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SaveForm(asd) {
    console.log(this.RefEmpForm.valid);
    console.log(this.RefEmpForm.value);
  }

  getLookup(ev) {
    console.log(ev);
  }
}
