import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-view-cabinet',
  templateUrl: './view-cabinet.component.html'
})
export class ViewCabinetComponent implements OnInit {
  CabinetCode: string;
  responseRack: Array<any> = new Array();

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly ViewLink: string = NavigationConstant.DOC_MNGMNT_VIEW_RACK;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/document-management/view-cabinet-detail.json";

    this.route.queryParams.subscribe(params => {
      if (params['CabinetCode'] != null) {
        this.CabinetCode = params['CabinetCode'];
      }
    });

    var rackObj: GenericObj = new GenericObj();
    rackObj.Code = this.CabinetCode;
    this.http.post(this.UrlConstantNew.GetListRackByCabinetCode, rackObj).subscribe(
      response => {
        this.responseRack = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl(NavigationConstant.ERROR);
      }
    );
  }
}