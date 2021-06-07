import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

@Component({
  selector: 'app-view-rack',
  templateUrl: './view-rack.component.html'
})
export class ViewRackComponent implements OnInit {
  RackCode: string;
  responseFiling: Array<any> = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['RackCode'] != null) {
        this.RackCode = params['RackCode'];
      }
    });

    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/document-management/viewRack.json";

    var filingObj: GenericObj = new GenericObj();
    filingObj.Code = this.RackCode;
    this.http.post(URLConstant.GetListFilingByRackCode, filingObj).subscribe(
      response => {
        this.responseFiling = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl(NavigationConstant.ERROR);
      }
    );
  }
}