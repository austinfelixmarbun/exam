import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-view-cabinet',
  templateUrl: './view-cabinet.component.html'
})
export class ViewCabinetComponent implements OnInit {
  CabinetCode: string;
  responseRack: any;
  GetListRackByCabinetCode = URLConstant.GetListRackByCabinetCode;

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly ViewLink: string = NavigationConstant.DOC_MNGMNT_VIEW_RACK;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/document-management/view-cabinet-detail.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.route.queryParams.subscribe(params => {
      if (params['CabinetCode'] != null) {
        this.CabinetCode = params['CabinetCode'];
      }
    });

    var rackObj = { "CabinetCode": this.CabinetCode };
    this.http.post(this.GetListRackByCabinetCode, rackObj).subscribe(
      response => {
        this.responseRack = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl(NavigationConstant.ERROR);
      }
    );
  }
}