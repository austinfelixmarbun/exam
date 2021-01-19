import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coa-detail',
  templateUrl: './coa-detail.component.html'
})
export class CoaDetailComponent implements OnInit {
  ListCurr: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  ListCOA: Array<any> = new Array<any>();
  ListEntityType: Array<any> = new Array<any>();
  ListCurrCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  Shows: boolean = false;

  constructor(
    private router: Router,
    private toastr: NGXToastrService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.GetDdlCurr();
    this.ListEntityType = [
      {
        Key: "Type 1",
        Value: "Type 1"
      },
      {
        Key: "Type 2",
        Value: "Type 2"
      },
      {
        Key: "Type 3",
        Value: "Type 3"
      },
    ];

    this.ListCOA = [
      {
        EntityType: "Type 1",
        EntityCode: "ENTITYCODE1",
        PaymentAllocCode: "PAYMENTALLOCCODE1"
      }
    ];

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
    this.toastr.successMessage('Success');
    this.router.navigate(['/setting/coa/paging']);
  }

  Show() {
    this.Shows = true;
  }
}